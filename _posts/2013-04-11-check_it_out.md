---
layout: post
title: 'HIPHOP系プログラミング言語 ﾁｪｹﾗｰ'
date: 2013-04-11
tags: [Ruby]
---

なんかプログラミング言語つくった。

## なぜか
それは俺が髪を染めたことに端を発する。

<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/hoto17296">hoto17296</a> ほとがおしゃれに目覚めるとか、、、そうか、世界も今日で終わりか。</p>&mdash; ごま@最初だけ気合入ってる系BBA (@gomaaburamax) <a href="https://twitter.com/gomaaburamax/status/321451539040456707">April 9, 2013</a></blockquote>

おしゃれほとさんは希少種である。

<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/hoto17296">hoto17296</a> ほとが言うと、「HIPHOPという言語開発したったｗｗｗうはｗこれで食えるｗｗｗ」という意味で解釈しそう</p>&mdash; ごま@最初だけ気合入ってる系BBA (@gomaaburamax) <a href="https://twitter.com/gomaaburamax/status/321453386543288321">April 9, 2013</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

なんだそれ意味ワカンネ。
**作ろう。**

## できた
その名も **HIPHOP系プログラミング言語 ﾁｪｹﾗｰ**

ソースコードとかはここから。
**[ hoto17296 / CheckItOut - Github ](https://github.com/hoto17296/CheckItOut)**

## しくみ

| 命令 | 意味 |
|---:|:---|
| COME ON! | ポインタを１進める |
| HO! | ポインタを１戻す |
| YO! | ポインタの指す値を１増やす |
| WOW! | ポインタの指す値を１減らす |
| ﾁｪｹﾗｰ! | ポインタの指す値が０なら、対応する```YEAH!```までジャンプする |
| YEAH! | ポインタの指す値が０でないなら、対応する```ﾁｪｹﾗｰ!```までジャンプする |
| AHA!? | ポインタの指す値を出力する |
| SO COOL! | 入力から１バイト読み込む |

[Brainf*ck](http://www.muppetlabs.com/~breadbox/bf/)系なので一応[チューリング完全](http://ja.wikipedia.org/wiki/チューリング完全)。

処理系の実装は [名状しがたいプログラミング言語のようなもの Nyaruko](https://github.com/masarakki/nyaruko_lang) の開発者さんが [素晴らしいgem](https://github.com/masarakki/r-fxxk) を公開しているのでそれを利用させてもらった。
したがってコードほとんど書いてない。

ﾖｰﾁｪｹﾗｯﾁｮｰ!!

## サンプルコード
### hello.yo
> COME ON!YO!YO!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!YO!YO!YO!YO!YO!COME ON!WOW!YEAH!HO!AHA!?COME ON!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!YO!COME ON!WOW!YEAH!HO!YO!AHA!?YO!YO!YO!YO!YO!YO!YO!AHA!?AHA!?YO!YO!YO!AHA!?ﾁｪｹﾗｰ!WOW!YEAH!COME ON!YO!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!YO!COME ON!WOW!YEAH!HO!AHA!?COME ON!YO!YO!YO!YO!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!YO!YO!COME ON!WOW!YEAH!HO!AHA!?COME ON!YO!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!COME ON!WOW!YEAH!HO!AHA!?YO!YO!YO!AHA!?WOW!WOW!WOW!WOW!WOW!WOW!AHA!?WOW!WOW!WOW!WOW!WOW!WOW!WOW!WOW!AHA!?ﾁｪｹﾗｰ!WOW!YEAH!COME ON!YO!YO!YO!YO!YO!YO!YO!YO!ﾁｪｹﾗｰ!HO!YO!YO!YO!YO!COME ON!WOW!YEAH!HO!YO!AHA!?ﾁｪｹﾗｰ!WOW!YEAH!YO!YO!YO!YO!YO!YO!YO!YO!YO!YO!AHA!?

### 実行
```
$ ./checkitout hello.yo
Hello World!
```

## 注意事項

※ 見ればわかると思いますが**ネタ言語**です。

※ HIPHOPをバカにするような意図は一切ございません。

※ ごめんなさい。
