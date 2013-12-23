---
layout: post
title: 'Macで「operation not permitted」と怒られた際の対処法'
date: 2012-06-27
tags: [Mac]
description: '久しぶりの投稿です。だいぶサボりました(´・ω・)'
image: 'exec_cake.png'
---

久しぶりの投稿です。

だいぶサボりました(´・ω・)

<!-- more -->

先日、CakePHP2.3.1で新しくアプリケーションを作ろうとして

``` bash
$ cake bake newapp
```

を実行したところ

``` bash
zsh: operation not permitted: cake
```

とのエラーが。

えっ？ 実行権限だってあるし所有者も自分だよ？ なんで？？？

``` bash
$ ls -la cake
-rwxr-xr-x  1 Hoto  staff  1070  5 22 18:37 cake
```

悩むこと小一時間・・・

なんとなく、Finderから実行してみることに（というか最初にこれをやるべきだった

![](/images/exec_cake.png)

ん？

・・・( ﾟдﾟ)！！


あぁ、ダウンロードしたファイルは初回実行時に確認されるってやつか！

これで「開く」を押して実行を許可してからは端末からも実行できるようになりました。


いちいちFinder開くのも面倒なんで、端末だけでこれを許可する方法を知ってる方いましたら教えて頂けませんか(´Д｀)
