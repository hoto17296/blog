---
layout: post
title: 'Mac OS X Mountain Lion に MeCab と CaboCha をインストールする'
date: 2012-12-04
tags: [Mac, 自然言語処理]
description: '新しい Mac mini に 日本語形態素解析器MeCab と 係り受け解析器CaboCha を入れたのでメモ。'
---

新しい Mac mini に 日本語形態素解析器**MeCab** と 係り受け解析器**CaboCha** を入れたのでメモ。

## MeCabをインストールする
[公式サイト](http://mecab.googlecode.com/svn/trunk/mecab/doc/index.html#download "MeCab: Yet Another Part-of-Speech and Morphological Analyzer")から MeCab本体 と IPA辞書 をダウンロードしてきて、解凍。

### MeCab本体をインストール
で、./configureしようと思ったらさっそく怒られた(´・ω・｀)

``` bash
configure: error: no acceptable C compiler found in $PATH
```


Cコンパイラがない？ 馬鹿な。ちゃんとXcode入れたのに。
と思ったら、Xcode4.3以降はコマンドラインツールを入れないとmakeやらgccやらが使えないらしい。

> [Xcode 4.3でmakeやgccはどこへ行った？！ - NAVER まとめ](http://matome.naver.jp/odai/2132945219176409901)

というわけでコマンドラインツールをインストールして、リトライ。

``` bash
$ ./configure --enable-utf8-only
$ make
$ sudo make install
```

OK ( ´ー｀)

### IPA辞書をインストール
``` bash
$ ./configure --with-charset=utf8
$ make
$ sudo make install
```

これでインストールできたはず。

### テスト
``` bash
$ mecab
夜は短し歩けよ乙女
夜    名詞,副詞可能,*,*,*,*,夜,ヨル,ヨル
は    助詞,係助詞,*,*,*,*,は,ハ,ワ
短し    形容詞,自立,*,*,形容詞・アウオ段,文語基本形,短い,ミジカシ,ミジカシ
歩けよ    動詞,自立,*,*,一段,命令ｙｏ,歩ける,アルケヨ,アルケヨ
乙女    名詞,一般,*,*,*,*,乙女,オトメ,オトメ
EOS
```

森見登美彦作品は素晴らしいと思います( ´_ゝ｀)

## CaboChaをインストールする
### CRF++をインストール
[CaboCha公式サイト](http://code.google.com/p/cabocha/ "CaboCha/南瓜: Yet Another Japanese Dependency Structure Analyzer")によるとCRF++が必要らしいので[こちら](http://crfpp.googlecode.com/svn/trunk/doc/index.html#download "CRF++: Yet Another CRF toolkit")からダウンロードしてきて解凍・インストール。

``` bash
$ ./configure
$ make
$ sudo make install
```

### CaboChaをインストール
[CaboCha公式サイト](href="http://code.google.com/p/cabocha/ "CaboCha/南瓜: Yet Another Japanese Dependency Structure Analyzer")からソースをダウンロードしてきて解凍・インストール。

ただし、そのまま./configureすると

``` bash
iconv conversion failed. skip this entry
```

なるエラーが出まくるので、オプション(？)を付けます。

``` bash
$ LIBS=-liconv ./configure --with-charset=UTF8
$ make
$ sudo make install
```

これでいけるはず。
### テスト
``` bash
$ cabocha
俺の妹がこんなに可愛いわけがない
俺の-D
妹が-------D
こんなに-D 　|
可愛い-D |
わけが-D
ない
EOS
```

以上、メモでした。
あらあらかしこ。
