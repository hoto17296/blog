---
layout: post
title: 'Dockerでつくるさいきょうのホームネットワーク'
date: 2014-12-09
tags: [Docker, Nginx, Lua, Redis, Dnsmasq]
description: 'Docker Advent Calendar 2014 7日目の記事です。めっちゃ遅刻です。申し訳ない。'
image: 'hotocloud.png'
---

[Docker Advent Calendar 2014](http://qiita.com/advent-calendar/2014/docker)
7日目の記事です。

めっちゃ遅刻です。申し訳ない。

今回は、Dockerを使って自分の家に自分専用クラウドサービスを**作りたい**話をする。

## やりたいこと
- 自宅ネットワークからのみアクセスできるWebアプリがある。
例えばこんなイメージ。

![イメージ](/images/hotocloud.png)

- ホスト名を指定するだけでサーバを増やせる
  - 好きなだけサーバを作れる自分専用クラウドサービス
- [ホスト名].home というURLでアクセスできる
  - IPアドレスなどという面倒なものは一切気にしなくていい


### Pocker について
実は Docker Advent Calendar 6日目の
[DockerでオレオレVPSを作った話](http://papix.hatenablog.com/entry/2014/12/06/235150)
で紹介されている Pocker とやりたいことは同じで、実装方法が違うだけ。

今回の実装方法の Pocker に対する違いとしては、

- コンテナのIPアドレスを固定しなくてもいい
- コンテナを新しく建てるたびに nginx.conf をいじらなくてもいい

の２つくらい。

## やりかた
家にそこそこいいスペックの自宅サーバがあり、それをホストマシンとして使う前提で話す。
なければ VPS でも同じようなことがやれる。

### \*.home をすべてそのサーバに向ける
まず、\*.home をすべてホストマシンのIPアドレスに向けさせる。

自宅ネットワークでしか使わないのに BIND を設定するのとかダルいので
Dnsmasq を使うか、最悪 hosts にベタ書きでもいいと思う。

このへんは詳しく書かない。

(ちなみに .home は勝手に名前をつけて使っている存在しない gTLD だが、
[新たに gTLD として採用されることはほぼない](http://internet.watch.impress.co.jp/docs/event/20131204_626241.html)
ので別に使っても問題無いと思う)

### ダイナミックリバースプロキシする
例えば、`airplay.home` という名前でホストマシンにアクセスが来たら、
`airplay` に対応するコンテナにプロキシしたい。

ホスト名とコンテナを対応させる情報は Redis に持たせて、
NginxからRedisにアクセスして動的にプロキシすればいいんだけど、
Nginxは単体ではRedisにアクセスしたりできないので、
ここでは **lua-nginx-module** を使う。

lua-nginx-module の導入は結構手間なのだけど、OpenResty を使ったら簡単に入れれてよかった。

> [Lua - OpenRestyはどれくらいお気軽なウェブアプリ環境なのか。 - Qiita](http://qiita.com/mah0x211/items/8870d7d1063f3d754076)

あとは nginx.conf に Lua のコードを埋め込んで、
Redisを利用した動的なプロキシを実装していく。

例えばこんな感じ。

```
worker_processes  2;
error_log logs/error.log info;

events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name *.home;

        location / {
            resolver 8.8.4.4;  # use Google's open DNS server

            set $target '';
            access_by_lua '
                local host = ngx.req.get_headers()["Host"]
                local match, error = ngx.re.match(host, "([a-z0-9]+)\\\\.home(:[0-9]+)?$", "i")
                if not match then
                    ngx.log(ngx.ERR, "match not found")
                    return ngx.exit(400)
                end
                local key = match[1]

                local redis = require "resty.redis"
                local red = redis:new()

                red:set_timeout(1000) -- 1 second

                local ok, err = red:connect("127.0.0.1", 6379)
                if not ok then
                    ngx.log(ngx.ERR, "failed to connect to redis: ", err)
                    return ngx.exit(500)
                end

                local host, err = red:get(key)
                if not host then
                    ngx.log(ngx.ERR, "failed to get redis key: ", err)
                    return ngx.exit(500)
                end

                if host == ngx.null then
                    ngx.log(ngx.ERR, "no host found for key ", key)
                    return ngx.exit(400)
                end

                ngx.var.target = host
            ';

            proxy_pass http://$target;
        }
    }
}
```

### DockerAPIを叩いてRedisを更新するWebインタフェースを用意する
あとはコンテナが立ったり消えたりした時に
Redis の情報が更新されるようにすればいいんだけど、
その部分はまだ実装できていないです(^q^)

作りたかったものとしては、DockerAPIを叩いてコンテナを立てたり消したりできる Webインタフェース を実装して、
立てたり消したりする度にコンテナの情報を拾ってきてRedisの情報を更新する、という感じ。

しかし全然間に合わなかった...

もし作れたらまた更新します...

## 課題
- やってみたら割と面倒臭かった。
- 80番ポートだけプロキシするならいいけど、他にもいろいろとポート開けたいときはどうしよう...

## まとめ
ていうかもう全然Dockerの話じゃなかった。重ね重ね申し訳ない。

もっと素直に、ホストマシンの外側のネットワークとDockerのネットワークをブリッジでつなげて、
Dnsmasq の設定を動的に書き換えて名前をつけるアプローチのがよさそうな気がしてきた。

次はそっち方面チャレンジしてみたい。

> [Docker Advent Calendar 2014](http://qiita.com/advent-calendar/2014/docker)

> - 6日目 [DockerでオレオレVPSを作った話](http://papix.hatenablog.com/entry/2014/12/06/235150)
> - 8日目 [Dockerを使ってオンラインコンパイル環境を作る](http://qiita.com/h2so5/items/69aee973898252b39e76)
