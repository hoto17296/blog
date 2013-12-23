---
layout: post
title: 'nginx + Unicorn で Rails3 を動かす'
date: 2012-12-29
tags: [Ruby, Ruby on Rails, イベント]
description: '昨日、名古屋エンジニアずのハッカソンに行ってきた(・∀・)'
image: 'nagoyaengineers.jpg'
---

![](/images/nagoyaengineers.jpg)

昨日、[名古屋エンジニアず](https://www.facebook.com/groups/245686602225555/ "名古屋エンジニアず - Facebook")のハッカソンに行ってきた(・∀・)

特にテーマは決めずに各々が好き勝手に開発する感じ。
[@tacke_jp](https://twitter.com/tacke_jp "tacke_jp - Twitter")さんとかマイコンのスイッチ押すとTwitterに「へぇ」と呟くへぇボタン(懐)を作ってた。
ゆるい。

そんな中自分は何をしていたかというと、nginx + Unicorn + Rails3 の環境構築。
Apacheもいいけどさ、もっとほら、色々使えたほうが楽しいじゃん？ってことで。<!--more-->

## 下準備
今回はMacさんのVirtualBoxにCentOS6.3を乗っけて動かす。

まずは、後々必要になるっぽいライブラリを色々インストール。

``` bash
# yum install gcc gcc-c++ openssl-devel zlib-devel pcre-devel sqlite-devel
```

ネットワークとかの設定は割愛。
あとは iptables の設定弄って80番ポートを空けておくくらいかな。

これで準備完了。

## rbenv, ruby-build を導入
複数バージョンのRubyを管理できるツールrbenvを入れる。
別にrvmでもよかったのだけど、こっちのが楽そうだったので。

> [rbenv を CentOS 6.3 にインストール - 俺の成長日記](http://d.hatena.ne.jp/katsuren/20121027/1351319825)

ぶっちゃけこの記事の通りにやったら出来た( ´_ゝ｀)
詳細とか書いてもただの丸コピになってしまうので割愛。

ただひとつ、sudoersを弄るときにsecure_pathの行をコメントアウトしないとsudoしてもPATHが引き継がれなかったので注意。

## Railsインストール
### Railsを動かすときに必要なあれこれをインストール

``` bash
# gem install execjs libv8 therubyracer sqlite3-ruby rdoc
```

今回JavaScriptエンジンはtherubyracerを使ってるけど、Node.jsがいい人はそっちをインストール。

### Railsをインストール

``` bash
# gem install rails
# rbenv rehash
```

### 動作確認
サンプルアプリケーションを作って動作確認。

``` bash
$ cd (サンプルアプリケーションを設置したい場所)
$ rails new sample
$ cd sample
$ sudo rails s -p 80
````

ブラウザから確認 → (σ・∀・)σ 動いた！

動作確認したら[Ctrl+C]でRailsサーバを止める。

## nginxをインストール
最近流行りのWebサーバ、nginx。
でも今回はUnicornが色々やってくれるのでnginxにはリバースプロキシだけやってもらう。

``` bash
# yum install nginx
# vi /etc/nginx/nginx.conf
(設定ファイルを編集する)
# service nginx start
# chkconfig nginx on
```

/etc/nginx/nginx.conf

``` bash
user nginx;
worker_processes 2; #マシンのプロセッサの数

error_log /var/log/nginx/error.log;

pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    upstream unicorn-sample {
        server unix:/tmp/unicorn-sample.sock; #Unicornのソケット
    }
    server {
        listen 80;
        server_name uhyohyo90.com; #サーバ名
        location / {
            if (-f $request_filename) { break; }
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_pass http://unicorn-sample; #upstramで指定した名前
        }
    }
}
```

## Unicornインストール
UnicornがRackアプリケーションサーバだからRailsが動く、っていうのはわかるんだけど、
そもそもRackアプリケーションとはなんぞやというのがまだよくわかってない(;´∀｀)

### インストール
``` bash
# gem install unicorn
```

### 設定ファイル記述
さっき作ったRailsのサンプルアプリケーションのディレクトリに移動して、config/unicorn.rbを書く。

``` bash
listen '/tmp/unicorn-sample.sock'
pid '/tmp/unicorn-sample.pid'
```

### Unicorn起動!! (ﾉ´∀｀)ﾉ

``` bash
$ sudo unicorn_rails -c config/unicorn.rb -D
```

なんかうまくいかんときは rbenv rehash とか bundle install とかやってみるとできるかも

### 動作確認
ブラウザからアクセスしてRailsのWelcomeページが表示されれば成功( ´ー｀)

## おしまい
文章にすると短いけど、これをエラーと格闘しながらやったら丸一日かかった...
時間が余ったら簡単なアプリケーションでも作ろうかと思ってたけどそんな余裕あるわけなかった

さて、次はRailsの使い方を覚えねば(｀・ω・´)
