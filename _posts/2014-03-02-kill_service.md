---
layout: post
title: '特定のサービスを殺すコマンド'
date: 2014-03-02
tags: [Jekyll]
description: '色々あって、バックグラウンドで動いてるJekyllのサーバを殺すスクリプトを書いたのでメモ'
image: ''
---

色々あって、バックグラウンドで動いてるJekyllのサーバを殺すスクリプトを書いたのでメモ。

## サービス起動
まずはJekyllのサーバをバックグラウンドで起動します。

```
$ jekyll serve -w > /dev/null &
```

## そして殺す
ｷｪｪｪｪｪｪ!!!

```
$ kill -9 `ps x | grep jekyll | grep -v grep | awk '{print $1}'`
```

プロセス一覧 (`ps x`) から  
jekyll を含むプロセスだけフィルタ (`grep jekyll`) して  
要らんプロセス弾いて (`grep -v grep`)  
プロセスIDだけ取得して (`awk '{print $1}'`)  
殺す。 (`kill -9`)

---

正直まだ `awk` コマンドとか全然使いこなせないし、これくらいのコマンドはスラスラ出てくるようになりたい。

ていうか Jekyll ってどっかにpidファイル作ってくれてたりしないの？
そしたらこんな手間いらないんだけど。
