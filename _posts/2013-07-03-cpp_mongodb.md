---
layout: post
title: 'C++ から MongoDB を扱えるようにしたメモ'
date: 2013-07-03
tags: [C++, MongoDB]
description: 'なぜか２日も費やしてしまったので忘れないようメモ。ちなみにOSは Mac OS X Mountain Lion。'
---

なぜか２日も費やしてしまったので忘れないようメモ。
ちなみにOSは **Mac OS X Mountain Lion** 。

## MongoDB公式のC++ドライバを入れる
詳しくはここ参照。
[Getting Started with the C++ Driver -- MongoDB Ecosystem 2.2.2](http://docs.mongodb.org/ecosystem/tutorial/getting-started-with-cpp-driver/)

### BoostとSconsを入れる
C++は全然詳しくないんだけどなんかかなり有名らしいC++のライブラリ [Boost](http://www.boost.org/) と、
makeをPythonでもっと便利にしたったぜー！的なビルドツール [Scons](http://www.scons.org/) が
必要らしいのであらかじめインストール。

Boostは入れるのに結構時間かかった。

```
$ wget http://downloads.sourceforge.net/project/boost/boost/1.53.0/boost_1_53_0.tar.gz
$ tar xzf boost_1_53_0.tar.gz
$ cd boost_1_53_0
$ ./bootstrap.sh
$ sudo ./b2 install
```

SconsはHomebrewで入れた。

```
$ brew install scons
```

### v2.4だとコケるという問題発生

```
$ http://downloads.mongodb.org/cxx-driver/mongodb-linux-x86_64-v2.4-latest.tgz
$ tar xzf mongodb-linux-x86_64-v2.4-latest.tgz
$ cd mongo-cxx-driver-v2.4
$ scons
(略)
scons: *** [build/mongo/util/processinfo_darwin.o] Source `src/mongo/util/processinfo_darwin.cpp' not found, needed by target `build/mongo/util/processinfo_darwin.o'.
scons: building terminated because of errors.
```

ぇ、なになに「`processinfo_darwin.cpp`が見つかりません」？？？

ぃゃ **知らんがな(´・ω・｀)**

入れとけよそこは。

### ナイトリー版を使ってみる
2013/07/01時点でのナイトリー版を見たら`processinfo_darwin.cpp`が入ってたので、そっちをビルドしてみることに。

```
$ wget http://downloads.mongodb.org/cxx-driver/mongodb-linux-x86_64-latest.tgz
$ tar xzf mongodb-linux-x86_64-latest.tgz
$ cd mongo-cxx-driver-nightly
$ scons
$ sudo cp libmongoclient.a /usr/local/lib
```

入った模様。

### サンプルプログラムを動かしてみる

```
$ g++ src/mongo/client/examples/tutorial.cpp -pthread -Isrc -Isrc/mongo -lmongoclient -lboost_thread -lboost_system -lboost_filesystem -L/usr/local/lib -o tutorial
$ ./tutorial
connected ok
count:5
{ _id: ObjectId('51d2ae7a94eb9cae2389bf31'), name: "Joe", age: 33 }
{ _id: ObjectId('51d2ae7a94eb9cae2389bf32'), name: "Jane", age: 40 }
{ _id: ObjectId('51d2ae7a94eb9cae2389bf33'), name: "Abe", age: 33 }
{ _id: ObjectId('51d2ae7a94eb9cae2389bf34'), name: "Methuselah", age: null }
{ _id: ObjectId('51d2ae7a94eb9cae2389bf35'), name: "Samantha", age: 21, city: "Los Angeles", state: "CA" }

printifage:
Abe
Joe
```

動いた(ﾟ∀ﾟ)
