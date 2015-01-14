---
layout: post
title: 'デプロイツールを使う程でもないときの git pull するだけのデプロイスクリプト'
date: 2015-01-14
tags: [deploy, git]
description: 'やっつけ感のあるシェルスクリプトを書きました'
image: ''
---

「Capistrano設定するのダルいな〜〜〜」

「でもわざわざ全サーバにログインして git pull するのもな〜〜〜」

というときに使えるシェルスクリプトです。

``` sh
#!/bin/sh

TARGET='staging' # デプロイ先
APPDIR='~/app'   # アプリのあるディレクトリ
BRANCH='master'  # デプロイするブランチ

while getopts :bdt: OPT
do
  case $OPT in
    'b' ) BRANCH="$OPTARG" ;;
    'd' ) APPDIR="$OPTARG" ;;
    't' ) TARGET="$OPTARG" ;;
      * ) echo "Usage: `basename $0` [-t TARGET] [-d APPDIR] [-b BRANCH]" 1>&2
          exit 1 ;;
  esac
done

# デプロイするホストの設定
case $TARGET in
  'staging' ) HOSTS=( app-stg-web-1 app-stg-web-2 ) ;;
  'release' ) HOSTS=( app-web-1 app-web-2 app-web-3 ) ;;
          * ) echo "Undefined target '${TARGET}'." 1>&2
              exit 1 ;;
esac

# デプロイできるかどうかチェック
for HOST in ${HOSTS[@]}; do
  REMOTE_BRANCH=`ssh ${HOST} "cd ${APPDIR} && git rev-parse --abbrev-ref HEAD"`

  # カレントブランチとデプロイしたいブランチが違っていたらエラー
  if [ $BRANCH != $REMOTE_BRANCH ]; then
    echo "Oops, ${HOST} branch is ${REMOTE_BRANCH}." 1>&2
    exit 1
  fi
done

# 各サーバにデプロイ
for HOST in ${HOSTS[@]}; do
  ssh $HOST "cd ${APPDIR} && git pull"
done
```
