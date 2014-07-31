---
layout: post
title: 'Vagrant RSync でローカル開発環境を作る際に注意すべきこと'
date: 2014-07-31
tags: [Vagrant, rsync, synced folder]
description: 'Vagrant でローカル開発環境を作ってたら色々とハマったのでメモ。'
image: 'vagrant_rsync.png'
---

Vagrant でローカル開発環境を作ってたら色々とハマったのでメモ。

## Synced Folders
手持ちのマシンにアプリケーションの実行環境を用意したいとき、Vagrantを使うのはよくあると思います。
ただ、ゲストOSに ssh して開発しようとするとクリップボード共有の設定とかがかなり面倒です。

そういうときは Vagrant の [Synced Folders](https://docs.vagrantup.com/v2/synced-folders/) 機能を使います。

要するに共有フォルダです。

ホストOSのフォルダをゲストOSにマウントすることで  
**ホストOSで開発 → ゲストOSで実行**  
を可能にします。

しかしここで問題があって、Synced Folders を利用して開発をしていると権限まわりのトラブルが非常に多いです。

実行ユーザに権限があるはずなのに `Operation not permitted` とか怒られたらだいたいコイツのせいです。

ホストOSとゲストOSのファイルシステムの違いによるものらしいのですが、
対処法が全くわからないので今回は別の方法でやろうと思います。

## Rsync Synced Folders
Vagrant 1.5 から [RSync](https://docs.vagrantup.com/v2/synced-folders/rsync.html)
を用いてファイルを共有できるようになりました。

RSyncならゲストOSのファイルシステムもネイティブなまま使えるので、
権限まわりのトラブルを回避することができます。

Rsync Synced Folders を使うためには、`Vagrantfile` に以下のように設定します。

``` ruby
config.vm.synced_folder "./path/to/host/dir", "/path/to/guest/dir",
  type: "rsync",
  owner: "hoto",
  group: "users",
  rsync__exclude: [".git", "tmp", "log", "cache"],
  rsync__chown: false
```

ここで指定したフォルダは `vagrant up` 時または `vagrant rsync` を実行すると同期されますが、

```
vagrant rsync-auto
```

を実行しておくとホスト側のファイルに変更があった際に自動で同期してくれます。

以下、それぞれのオプションの解説。

### type
`type: "rsync"` を指定すると、RSync を利用して共有するようになります。

RSync を利用するにはホストOSとゲストOSの両方に `rsync` コマンドが必要ですが、
ゲストOSには Vagrant が適宜 `yum -y install rsync` などを実行してくれるようです。

### owner, group
通常の Synced Folders と同じで、ゲストOSでのファイルのオーナーとグループを指定します。

### rsync__exclude
同期の対象外にするファイルやフォルダを指定します。

公式ドキュメントによると、 `.git` などを指定するといいらしいです。

### rsync__chown
Vagrant Rsync では、同期をするたびにゲストOSのフォルダに
`chown -R {user}.{group}` が実行されてファイルオーナーとグループがすべて統一されます。

おそらく同期に失敗しないための処理か何かなのでしょうけど、詳しいところはわからないです。

`rsync__chown` は **Vagrant 1.6.3 から**追加されたオプションで、
`false` を指定することで同期する際に自動で `chown -R` するのを抑制します。

アプリケーションのキャッシュやログファイルなどはファイルオーナーが
`apache` や `nginx` でないと動作しなかったりするので、
同期するたび自動で `chown -R` がかかると非常に不都合な場合にこのオプションを指定します。

## 使ってみた結果
RSyncによる共有にしてから権限まわりで躓くことがなくなったのでだいぶいい感じです。

また、`rsync__chown` はこのエントリ公開時点(2014/07)での最新版(1.6.3)でないと使えないオプションなので、
試す前に Vagrant を最新版にアップデートするのを忘れないようにしましょう。
