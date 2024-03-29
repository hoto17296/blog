---
layout: post
title: 'Pixelmatorの至らない部分をImageMagickで補完した話'
date: 2014-12-29
tags: [Pixelmator, ImageMagick, Mac]
description: 'Photoshopを使わなくても工夫次第でなんとかなるという話です。'
image: 'lightness2alpha.png'
---

Windowsには「ペイント」がありますが、Macには標準のペイントツールがありません。
(プレビュー.app を使えば簡単な写真加工くらいは出来ますが、お絵かきツールとしては使えません。)

Photoshop は高くて手が出ないし(そもそもそこまでガチ勢なわけでもないし)
GIMP は X11 がダメすぎてつらいなぁ、という感じです。

そんな痒いところに手が届くペイントツールとして
[Pixelmator](http://www.pixelmator.com/)
を使っているMacユーザも多いのではないのでしょうか。

## Pixelmator について
Pixelmator は Mac App Store からダウンロードできるペイントツールで、
3000円(2014/12/29時点)という趣味でも手が届くレベルの価格設定ながらも
Photoshop に引けをとらない高機能さを持っています。

とはいえ、どうしても「Photoshopに劣る部分」はあって、個人的に気になるのを挙げると

- ググっても情報が少ない
- 文字を縦書きにできない
- 画像の明度でマスクをかけれない

このようなものがあります。

このうち  
「ググっても情報が少ない」は**気合**でカバー、  
「文字を縦書きにできない」は**一文字ずつ改行していく運用**でカバー  
できますが、

「画像の明度でマスクをかけれない」

これだけはどうにもならない感じがしていました。

## 画像の明度でマスクをかける とは
なにがしたいのかというと、画像の明るい部分ほど不透明で，暗い部分ほど透明になるようにマスクをかけたいのです。

先日書いた<s>クソくだらない</s>[エントリ](/blog/zsh_colorful/)でレインボーなヌマクロー画像を作ったのですが、このヌマクロー画像をつくるのに「画像の明度でマスクをかける」処理が必要でした。

![](/images/lightness2alpha.png)

(①が元画像で④が作りたい画像)

①→② はグレースケール変換と色反転しただけです。  
③→④ は Pixelmator のクリッピングマスク機能でできます。

問題は ②→③ で、白黒画像の明度をアルファチャンネルに変換して半透明画像を作っているのですが、
Pixelmator ではこの変換処理ができません。

## ImageMagickでなんとかする
ではどうしたかというと、②→③ の変換を ImageMagick でやることにしました。

ImageMagick はプログラムで画像処理を行うのによく用いられるツールです。
Mac で Homebrew を入れている人は `brew install imagemagick` でインストールでき、
インストールすると `convert` コマンドが使えるようになります。

`convert` コマンドを使うと、Pixelmator ではできなかった「画像の明度をアルファチャンネルに変換」ができるようになります。
(さらに、色反転も一緒にやってしまえば ①→②→③ の変換を一気にできます。)

```
convert input.png -matte -negate -channel a -fx "lightness" -channel rgb -fx "#FFFFFF" output.png
```

`-matte` オプションをつけて出力を PNG 画像にしないとアルファチャンネルが出力されないのでご注意ください。

`-nagate` は色反転のオプションです。

## まとめ
Pixelmator は Photoshop と比べると少しだけできることが少ないですが、ImageMagick と組み合わせたりすることでだいたいなんとかなるものです。
ほんの一手間で Photoshop を買わなくて済むのなら、かなり良い節約なのではないでしょうか。

また「画像の明度でマスクをかける」は「なんの役に立つんだこれ」と思うかもしれませんが、ちょっとシャレオツな雰囲気を出したいときなどにけっこう役に立つテクなので、覚えておいて損はないと思います。
