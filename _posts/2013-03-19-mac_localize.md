---
layout: post
title: 'Mac OS X のFinderで英語のフォルダを日本語で表示する'
date: 2013-03-19
tags: [Mac]
description: 'Macのターミナルでファイル一覧を見るとフォルダ名は英語になっているのだが、これをFinderで見ると日本語で表示されている。これ非常に便利。しかしながら、いくつか不満点がある。'
image: 'finder_after.png'
---

## Mac OS X の便利機能
Macのターミナルでファイル一覧を見ると

``` bash
$ ls ~
Applications    Documents   Dropbox     Library     Music       Public
Desktop     Downloads   Kobito.db   Movies      Pictures    Sites
```

フォルダ名は英語になっているのだが、
これをFinderで見ると

![](/images/finder_before.png)

日本語で表示されている。

このように Mac OS X には
「**日本語のフォルダ名って(プログラムからアクセスするときとか)色々面倒だから英語にしておくけど、Finderから見たときは日本語で表示してあげるよ**」
という機能が付いている。

これ非常に便利。

しかしながら、いくつか不満点がある。

## やりたいこと

### 表示される名前を変えたい
「ピクチャ」とかってなんかムズ痒くない？
「Picture」か「画像」にしてほしい。

### 標準で用意されているフォルダ以外のフォルダも日本語で表示させたい
「Work」ってフォルダを作って、Finderでは「開発」って表示させたい

## しくみ
次の２つを満たしたときに、フォルダ名が日本語になるらしい。

- SystemFolderLocalizations.strings にフォルダ名が定義されている
- フォルダ内に .localized という空の隠しファイルが存在する

## やり方

まず、「/System/Library/CoreServices/SystemFolderLocalizations/Japanese.lproj/」にある「SystemFolderLocalizations.strings」を編集する。

が、しかし

この設定ファイル、バイナリplistという形式で普通のテキストエディタでは編集できない。

そこで、
**一旦xmlに変換してから編集して元に戻す**
という方法をとる。

xml⇔bplist の変換には **plutil** というコマンドを使う。
これはXcode入れてれば使えるっぽい。

``` bash
$ which plutil
/usr/bin/plutil
```

設定ファイルがある場所に移動。

``` bash
$ cd /System/Library/CoreServices/SystemFolderLocalizations/Japanese.lproj/
```

xmlに変換・viで編集。

``` bash
$ sudo plutil -convert xml1 SystemFolderLocalizations.strings
$ sudo vi SystemFolderLocalizations.strings
```

すると、

``` xml
<key>Pictures</key>
<string>ピクチャ</string>
```

みたいのがたくさんあるので、好きな文字列に書き換えるなり新しいのを追加するなりする。

保存したら、bplistに戻す。

``` bash
$ sudo plutil -convert binary1 SystemFolderLocalizations.strings
```

(新しく日本語で表示するフォルダを追加したい場合)
日本語で表示させたいフォルダ内に .localized ファイルを作成する。

``` bash
$ cd ~/Work
$ touch .localized
```

あとは、Finderを再起動すれば・・・

![](/images/finder_after.png)

できた！！ (・∀・)
