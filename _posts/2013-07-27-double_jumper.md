---
layout: post
title: '煩わしいクッションページをすっ飛ばすFirefoxアドオン作った'
date: 2013-07-27
tags: []
description: 'はてブとGunosyのクッションページから自動でリダイレクトしてくれるFirefoxアドオン「DoubleJumper」作った。'
image: 'double_jumper.png'
---

Gunosy とか はてなブックマーク は今更説明するまでもなく素晴らしいキュレーションサービスで、いつもお世話になっているのだけど、如何せんあのクッションページだけはいただけない。

## クッションページとは

はてなブックマークでは、ページをブックマークした際にTwitterへ投稿する機能を使うと、投稿されるつぶやきに貼られるURLは元ページではなくはてブのクッションページのURLとなる。
詳細： [Twitterへ投稿されるURLのリンク先を変更しました - はてなブックマーク開発ブログ](http://bookmark.hatenastaff.com/entry/2013/06/26/214500)

同様に、GunosyでもアプリからSNSにページのURLを共有しようとすると、元ページではなくGunosyのクッションページが投稿される。

はてブのクッションページは人気コメントとかブックマーク数が見れて、ユーザにとってもある程度の意味はあるかもしれないが、Gunosyに至っては「Gunosyの宣伝したいだけじゃん！！」としか思えないようなクッションページである。

はっきり言ってクッションページは嫌いだ。
その１クリックの無駄がイライラする。

ならば、その１クリックをなくしてやろうぞ。

## DoubleJumper
![](/images/double_jumper.png)

はてブとGunosyのクッションページから自動でリダイレクトしてくれるFirefoxアドオン「**DoubleJumper**」作った。

[DoubleJumper :: Add-ons for Firefox](https://addons.mozilla.org/ja/firefox/addon/doublejumper/)

Firefoxアドオンって意外と簡単に作れるのな。
今回10行くらいしかコード書いてないし。

また気が向いたらなんかアドオン作ろう。
