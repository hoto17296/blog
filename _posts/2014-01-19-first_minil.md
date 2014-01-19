---
layout: post
title: 'はじめてのCPAN Authorになろうとして困ったメモ'
date: 2014-01-19
tags: [Perl, CPAN, Minilla]
description: 'CPAN Authorになろうと思って、Minillaでモジュールを開発していたんだ。'
---

CPAN Authorになろうと思って、[Minilla][minil]でモジュールを開発していたんだ。

モジュールができてテストも通って、
いざ公開！これで俺もCPAN Authorじゃあああ！！
と思ったら、アップロードができなかった。

```
$ minil release
(略)
Release to CPAN ? [y/n] y
missing user argument at /Users/(略)/UploadToCPAN.pm line 52.
```

ファッ！？

ググっても何も出てこなくて地味に困ったんだけど、
要はPAUSEのユーザ情報を書いておけばいいらしい。

```
$ vi ~/.pause
user YourUsername
password YourPassword
$ chmod 600 ~/.pause
```

こういうのって普通、アップロードする度にパスワード訊いてきたりするもんじゃないの・・・？

ファイルにパスワード書いて置いておかないといけないのって割と不安なんだけど(´･\_･`)


[minil]: http://perldoc.jp/docs/modules/Minilla-v0.6.4/lib/Minilla.pod
