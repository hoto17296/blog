---
layout: post
title: 'Dockerで複数のサービスを動かす'
date: 2014-07-15
tags: [Docker, CentOS, Upstart]
description: 'Dockerはパスをひとつ指定して起動するから複数のサービスを起動させたいときは Supervisord なんかを使うのが常套だけど、普通のサーバっぽくinitできないのかなーと思ってやってみたらできたのでメモ。'
image: 'docker_upstart.png'
---

Dockerはパスをひとつ指定して起動するから複数のサービスを起動させたいときは Supervisord なんかを使うのが常套だけど、
普通のサーバっぽくinitできないのかなーと思ってやってみたらできたのでメモ。

CentOS6.5です。

Ubuntuの場合は以下のページに載ってた。

> [/sbin/init (upstart) in docker + ssh - Qiita](http://qiita.com/amedama/items/cbdc51f1f3e78d1f3366)

## とりあえず普通に `/sbin/init` 指定で起動してみる
```
$ docker run -d centos /sbin/init
2014/07/15 15:47:40 exec: "/sbin/init": stat /sbin/init: no such file or directory
```

マジかよ、 `/sbin/init` 無いってよ。

`/sbin/init` って起動するときに必要なプログラムじゃなかったん？

## Upstart入れる
調べたら Upstart が入ってないだけだった。  
ていうか Upstart って CentOS6.x なら標準で入ってるもんかと思ってた...。

普通に `yum install upstart` でもいいんだけど、
そんなことしなくても `openssh-server` 入れたら依存モジュールとして勝手に入った。

```
# yum -y install openssh-server
# chkconfig sshd on
```

```
$ docker commit <CONTAINER ID> hoto17296/sshd
$ docker run -d -p22 hoto17296/sshd /sbin/init
```

ちなみに、こないだ正式リリースされた CentOS7 からは Systemd が導入されたから別の方法いるぽい。
