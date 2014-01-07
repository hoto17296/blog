---
layout: post
title: 'Nginxでつくる、どシンプルな静的コンテンツサーバ'
date: 2014-01-07
tags: [Nginx, Node.js]
description: 'バックアップ用にNetatalkでファイルサーバを立てたので、 ついでにWeb上でファイルを公開するサーバを作っちゃえ と思い立ってNginxでちゃちゃっと作ってみたメモ。'
---

バックアップ用にNetatalkでファイルサーバを立てたので、
ついでにWeb上でファイルを公開するサーバを作っちゃえ と思い立ってNginxでちゃちゃっと作ってみたメモ。

今回は<del>性的な</del>静的なファイルを置くだけなので設定は極力シンプルに。

```
server {
    location / { root /home/hoto/public; }
    location ~ /\. { deny all; }
    error_page 404 =301 http://hotolab.net/404.html;
}
```

**５行**＼(^o^)／

Nginxはどこぞのhttpdと違って設定がシンプルに記述できてイイネ！！

説明するまでもないと思うが一応説明すると、

- ドキュメントルートはホームディレクトリの`public`
- ドットファイルへのアクセスは拒否
- 404ページは作るのがダルかったのでこのブログの404ページにリダイレクトさせる

という感じ。

## 動かぬ
しかしこれが動かなかった。

むしろどこが間違ってんだよっていうレベルなのに。  
なんか403エラー吐きよる。

とりあえずログを見る。

```
open() "/home/hoto/public/test.txt" failed (13: Permission denied)
```

ほほう。
権限が無いと。

```
$ ls -la /home/hoto/public/
total 16
drwxrwxrwx 3 hoto 4096  Jan  7 21:54 2014 .
drwx------ 8 hoto 4096  Jan  7 22:08 2014 ..
-rw-rw-r-- 1 hoto    9  Jan  7 20:17 2014 test.txt
```

あるやん(´Д｀)

ディレクトリが777で、ファイルに読み込み権限があって、あとは何が不満か。

ググったら"SELinuxのせいだ"っていう記事を見つけたけどそもそもSELinux切ってあるし。

不思議だなーと思ってたけど、どうも**上の階層のディレクトリに権限がない**のが原因らしい。

> [apache を利用しての public_html が公開できない - 解 - いろきゅう.jp ～Programmable maiden～ Tech side](http://d.hatena.ne.jp/ir9Ex/20061109/1163066167)

具体的には、
ホームディレクトリ( `/home/hoto` )の権限が `700(drwx------)` になっていて、
ここのOtherに実行権限( `o+x` )がないとダメらしい。

というわけで

```
$ chmod o+x /home/hoto/
```

これで動いた。

なんで実行権限がいるのかはわからない。  
誰か教えて(´・ω・)
