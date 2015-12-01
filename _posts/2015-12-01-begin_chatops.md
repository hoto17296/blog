---
layout: post
title: 'ChatOps 入門'
date: 2015-12-01
tags: ['ChatOps', 'Hubot', 'JavaScript']
description: 'ChatOps Advent Calendar 1日目'
image: 'chatops_hubot.png'
---

今年も Advent Calendar の季節がやって来ました。
というわけで [ChatOps Advent Calendar](http://qiita.com/advent-calendar/2015/chatops) 1日目です。

2015年は Bot づくりにハマったということもあり、ChatOps で Advent Calendar を作りました。
まだ少し枠が空いているので何かネタがある方は是非書いてください＼(^o^)／

とりあえず１日目なので「ChatOpsってとりあえず何したらいいんじゃ」という人のための手引きを書いていきます。

## ChatOps とは何か
もしかしてチャットツールのことを「誰かとおしゃべりするためのツール」だと思っていないですか？
残念ながらそれは古い常識です。

現代におけるチャットツールとは「**あらゆるリソースにアクセスするための汎用インタフェース**」です。
例えば、毎朝その日の天気と気温を Bot につぶやかせてみたり、サーバーの負荷が上がったら Bot がアラートを上げるようにしてみたり。

また情報を得るだけでなく、チャットを通じてメッセージを送ることでリソースを制御することもできます。
例えば、帰宅途中にスマホのチャットアプリから Bot にメッセージを送ることで自宅のエアコンを遠隔で付けるなどの使い方ができます。

このように、チャットは「お喋りをするもの」として使うには余りあるほどの汎用的を秘めています。
最近では自分と Bot しかいない「**ひとりチャットチーム**」を作って Bot を日常生活でフル活用する人も増えてきました。(このへんのライフハックは他の誰かが書いてくれそうなので割愛します)

このように、チャットツールを人とのコミュニケーション以外の用途に活用することを(広い意味での) ChatOps と言います。

## ChatOps 三種の神器
「とりあえず ChatOps はじめてみたい！」という人のために、定番オススメのツールの組み合わせを紹介します。

### Slack
![Slack](/images/chatops_slack.png)  
[Slack: Be less busy](https://slack.com/)

肝心のチャットツールです。
世の中には数多のチャットツールがありますが、特に制約がないのであれば Slack を強くお勧めします。

Slack の良さはたくさんあるのですが、ChatOps に関するところでいうと「**Slack そのものが Bot を使う前提で設計されている**」というのが大きくて、

- 普通のユーザーと Bot ユーザーがちゃんと区別されている
  - 有料プランを利用していても Bot ユーザー分は課金されない
- Bot まわりの API や Integration が充実していて非常に使いやすい

などの良さがあります。

### Hubot
![Hubot](/images/chatops_hubot.png)  
[HUBOT](https://hubot.github.com/)

自前で API を叩くスクリプトを書いて Bot を実装するのもそれはそれで楽しそうですが、なかなか大変なので Bot フレームワークである Hubot を使うことが多いです。
Hubot の導入方法や使い方については既にたくさん記事があるのでそれを見るといいでしょう。

> [Hubot:概要〜インストール〜実用的なモノが作れるまで - Qiita](http://qiita.com/Kta-M/items/d7e0f371e40b4cefc38a)

Hubot で Bot の機能を開発するときは CoffeeScript で書きますが、ぶっちゃけ JavaScript にトランスパイルできればなんでもいいので僕は ES2015 で書いています。
JavaScript ではなく Ruby で書きたいという人には [Lita](https://www.lita.io/) や [Ruboty](https://github.com/r7kamura/ruboty) という Bot フレームワークもあります。

### Heroku
![Heroku](/images/chatops_heroku.png)  
[Heroku | Cloud Application Platform](https://www.heroku.com/)

チャットツールや Bot フレームワークは無料で使えることが多いですが、サーバはそいういうわけにもいきません。
また Bot はほとんど性能を要求しないアプリケーションであるため、そのためだけに VPS やクラウドサーバを契約するのはもったいない気もします。

そこで Heroku です。
Heroku には無料プランがあります。
もともと無料プランは開発用途のプランであるためスペックはかなり低いのですが、Bot にはほとんど性能が必要ないので問題になりません。

しかしここでひとつ問題があります。
Heroku は[2015年5月の料金改定](https://blog.heroku.com/archives/2015/6/15/dynos-pricing-ga)で **無料プランだと1日18時間まで** しか Dyno (サーバ)を動かせなくなりました。
サービスを24時間稼働し続けることができなくなったため、Heroku の無料プランで Web アプリや API を運用していた人は Hobby プラン($7/month)にアップグレードする必要が生じました。
Heroku としては「無料プランは開発用途だから本番運用に使わないでくれよ」という意図があるのでしょう。

ところが Bot について考えてみると、 **Bot は24時間動き続けている必要はない** ということに気づきます。
人間が普段眠っている時間に Bot も同様に眠っておいてもらえば、稼働時間が1日18時間でも特に問題はなさそうです。
<del>むしろ1日18時間も働かせるのブラック企業では。</del>
ちなみにここでいう「指定した時間に眠っておいてもらう」は [Process Scheduler](https://elements.heroku.com/addons/process-scheduler) という Heroku アドオンを使うと簡単に実現することが出来ます。

## まとめ
ChatOps は **ちょっとしたプログラミングで日常生活やチームコミュニケーションを豊かにしていける** というのが本当に楽しくてたまらないのでオススメです。
具体的な「こういうのやってみた」などのアイデアはこれからの ChatOps Advent Calendar で知れると思うので楽しみですね！！！

## 突然の宣伝
12/18(金)発売の「Software Design 2016年1月号」の ChatOps 特集に Gaiax の ChatOps 事情の話を寄稿させていただいたので是非に！
