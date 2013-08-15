---
layout: post
title: 'ssh-agentをちょっとだけ理解したメモ'
date: 2013-05-24
tags: []
---

## デプロイできなくなった
このブログのコードってCapistranoでデプロイしてるんだけど、こないだバグ発見したからそれを修正してデプロイしようとしたのな。

```
$ bundle exec cap deploy
(略)
 ** [hotolab.net :: out] Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
 ** [hotolab.net :: out] fatal: The remote end hung up unexpectedly
```

**は？**

いや、SSH鍵の設定ちゃんとできてるし。
サーバに公開鍵認証でログインできるし。

ていうかこないだデプロイしてからCapistranoの設定変えてないのにどうして唐突にできなくなったし(´Д｀)

## ssh-agentのせいっぽい
ググってたら**ssh-agent**のせいっぽいみたいなことが書いてあったので

```
$ ssh-add
```
を実行したらそれだけで解決した。

ssh-agentってサーバに公開鍵を登録するとき(ssh-copy-id)とかに使ったから**鍵を管理してくれてる何か**ってのは知ってたけど、詳しくは知らなかった。

## ssh-agent is 何
**公開鍵認証のパスフレーズ入力を省略出来るようにするツール**らしい。

ssh-agentが起動してるときに `ssh-add [秘密鍵のPATH]` とすると、秘密鍵を一定時間(もしくはプロセス終了まで)キャッシュしてくれる、と。

今回デプロイしようとした際にはssh-agentが秘密鍵をキャッシュしてなかったから、Capistranoがssh-agentに秘密鍵を問い合わせても何もなくてログインできなかった、っていうことか。

ほー。
