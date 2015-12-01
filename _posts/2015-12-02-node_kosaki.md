---
layout: post
title: '最高の ChatOps'
date: 2015-12-02
tags: []
description: 'まずは何も言わずにこれを見て欲しい'
image: 'kosaki.png'
---

[Dark Advent Calendar](http://www.adventar.org/calendars/1169) ２日目。

昨日は ChatOps Advent Calendar で [ChatOps 入門](/blog/begin_chatops) というエントリを書いた。  
今日は僕の最高の ChatOps について紹介する。

　

まずは何も考えずにこれを見て欲しい。  
[http://xn--3ur52o1bb7099d.xn--u9jb933vm9i.com](http://xn--3ur52o1bb7099d.xn--u9jb933vm9i.com)

　

最高の体験が得られたと思う。

これはとある経緯があって作ったもので、これだけでも十分 QOL が高まるものだが、さらにこの Web サービスのリソースに対して誰でも気軽にアクセス出来るようにするために WebAPI とその Node.js クライアントを書いた。

> [hoto17296/kosaki - GitHub](https://github.com/hoto17296/kosaki)

これによって、どのご家庭にも１台はいる Hubot に

```
$ npm install hoto17296/kosaki
$ vim scripts/kosaki.coffee
```

``` coffee
Kosaki = require 'kosaki'
kosaki = new Kosaki()

module.exports = (robot) ->

  robot.hear /(小野寺|小咲)/, (msg) ->
    msg.send kosaki.random()
```

たったのこれだけの変更を加えるだけで

![kosaki](/images/kosaki.png)

このような最高の体験を得ることが出来るようになった。

　

僕はこれこそが最高の ChatOps だと思うし、エンジニアのライフハックとはこうあるべきなんだと思う。

最高のエンジニアリングをしていこう。
