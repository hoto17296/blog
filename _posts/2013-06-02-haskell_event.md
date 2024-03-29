---
layout: post
title: 'Haskell勉強会してきたレポ'
date: 2013-06-02
tags: [イベント, Haskell]
description: '@tacke_jpさんと「Haskell勉強会したいですねー」って話をしてて「じゃあやろっか」ってなったのでやってきた。'
---

[@tacke_jp](https://twitter.com/tacke_jp)さんと「Haskell勉強会したいですねー」って話をしてて「じゃあやろっか」ってなったのでやってきた。

曲がりなりにも[名古屋エンジニアず](https://www.facebook.com/groups/245686602225555/)だし、東京に行って「ぇ、あの**関数型帝国名古屋**から来たの！？」って言われたときに平然とOOPをdisれるくらいにはなっておかないと。[なごやこわい](https://twitter.com/search?q=%23なごやこわい)。

Haskellは2,3年くらい前に授業でちょろっと書いた程度で、それ以来やってない。
なのでこの記事は**Haskellビギナーが色々調べてみたぜメモ**みたいなもんで、そんな深いことまで書いてないのでそこらへんはご理解ください。

## とりあえずProjectEuler
Ruby覚えた時もそうだったけど、新しい言語を習得するときは[ProjectEuler](http://projecteuler.net/)の問題を片っ端から解いてみるのが一番手っ取り早いと思ってる。
今回もとりあえずProjectEulerをはじめから解いていくことにした。

### Problem 1 「3と5の倍数」
> 10未満の自然数のうち, 3 もしくは 5 の倍数になっているものは 3, 5, 6, 9 の4つがあり, これらの合計は 23 になる.
> 同じようにして, 1000 未満の 3 か 5 の倍数になっている数字の合計を求めよ.

いくら初心者と言えどこれくらいはできる。

``` haskell
ans = sum $ map (\n -> if n `mod` 3 == 0 || n `mod` 5 == 0 then n else 0) [1..1000-1]
main = putStrLn $ show ans
```

ナメてもらっては困る（ドヤァ

よし、次。

### Problem 2 「偶数のフィボナッチ数」
> フィボナッチ数列の項は前の2つの項の和である. 最初の2項を 1, 2 とすれば, 最初の10項は以下の通りである.
> 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
> 数列の項の値が400万を超えない範囲で, 偶数値の項の総和を求めよ.

関数型言語といえば！
再帰！！

フィボナッチ数列を計算する関数くらい授業でやりました余裕っすね！

``` haskell
fib :: Int -> Int
fib 0 = 1
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
-- とりあえず50項目までのフィボナッチ数を表示してみる
main = putStrLn $ show $ map fib [1..50]
```

うん。授業ならこれでも良かった。

でもやってみるとわかるけど、このコードは動かない。
ていうか、いつまで経っても終わらない。

結論から言うと、**この問題解けなかった**よね。
今回のHaskell勉強会、解けた問題数１問。

Haskellやってる人にとっては定番のハマりポイントらしい。


ちょっと考えてみりゃすぐ分かる話で、
例えば fib(50) を計算するために、既に求めたはずの fib(49) と fib(48) を計算しなおしてる。
さらにその fib(49) を計算するために fib(48) と fib(47) を計算しなおして、さらにその fib(48) を（以下略
という具合に計算量がトンデモないことになる。

一度計算した値を保持しておけばこんな事にはならないはずなのになー。

ちなみに同じことをRubyにやらせるとこうなる。

``` ruby
# 50項目までのフィボナッチ数を表示する
a = b = 1
50.times do
  a, b = b, a+b
  puts a
end
```

**前の計算結果を保持している**から、無駄な計算をすることがない。（[動的計画法](http://ja.wikipedia.org/wiki/動的計画法)というらしい）

同じ事がHaskellではできないのだろうか？

## Haskell の 副作用 と 参照透過性

Haskellみたいな**純粋関数型言語**には、「状態」という概念はない。

同じ関数に同じ引数を渡したら必ず同じ結果が返ってくる。
関数の中から外部の変数に影響を与えたり、外部の変数によって結果が変わったりしない。
そもそも、一度変数に値を代入したら(値を変数に束縛したら)、後から再代入することはできない。(**[参照透過性](http://ja.wikipedia.org/wiki/参照透過性)**)

「ええ何それめっちゃ不便じゃん」と思うけど、この**外部の状態に依存しない**性質のおかげで関数の数学的性質が保たれてウンタラカンタラ…っていう記事をどこかで読んだ気がする。
<del>関数型言語が流行らない理由これなのでは</del>

で、この参照透過性を崩す動作のことを**[副作用](http://ja.wikipedia.org/wiki/副作用_(プログラム\))**というのだけど、Haskellには原則として副作用がない。(※)

副作用がないから、前の状態を記憶しておけない。
だから、フィボナッチ数列みたいな問題を解こうとすると一筋縄じゃいかない。

※ 完全に副作用がないわけではなく、入出力を実現するための[モナド](http://ja.wikipedia.org/wiki/モナド_(プログラミング\))という概念には副作用はある。
[Haskellと副作用 / kazu-yamamoto](http://d.hatena.ne.jp/kazu-yamamoto/20091214/1260774669)

## Haskellでもメモ化したい！
では、Haskellでも[メモ化](http://ja.wikipedia.org/wiki/メモ化)したい！
という場合にはどうしたらいいか。

ググったら

- Yコンビネータを使う
- Stateモナドを使う

みたいな方法があるらしい。
順番に見ていこう。

### Yコンビネータ を使う
[Yコンビネータ](http://ja.wikipedia.org/wiki/不動点コンビネータ)とは「**関数を入力として受け取り、その関数を使う新しい関数を作って出力する関数**」であり、そのYコンビネータを用いて「**任意の関数が与えられたときに、その計算をメモ化する関数を作成する**」ということをするとフィボナッチ数列のような再帰の問題が解けるらしい。

なるほどね。

**パス。**

### Stateモナドを使う
Stateモナドとやらを使うと状態を表現することができるらしい。

はて、そもそもモナドとは何か？

> [モナド (プログラミング) - Wikipedia](http://ja.wikipedia.org/wiki/モナド_(プログラミング\))
計算機科学におけるモナド（Monads）とは、計算機科学者のEugenio Moggiによって提案されたモジュール性を持たせた表示的意味論の枠組みを言う。プログラムとはクライスリ圏の射である（program is arrow of Kleisli category）、という要請から合成規則としてクライスリトリプル(Kleisli triple)というモナドと等価なものが用いられる。型システムへの適用であるプログラミング言語のHaskellで用いられるものがよく知られている。

うん、わかる〜。超わかるよ。
俺のモナドも強く静的にOOPをカリー化した副作用でマジλ式だもん。

**パス。**

### メモ化むずい

どれもHaskellビギナーの俺にはややこしすぎたので、一番簡単そうだった[これ](http://techtipshoge.blogspot.jp/2011/06/haskell.html)をやってみることにした。

> 更新ができなければ、毎回更新されたメモ化のコンテナを新しい変数として作成してやればいいことに気付きました。これはHaskellでは常套手段のようです。

どうやらそういう方法もあるらしい。

これならなんとか理解できそう！
よしやるぞー！＼(^o^)／

...ってところで今回の**Haskell勉強会は終了**しました\_(：3 」∠ )\_
できたらまた記事書くよ。

というわけでまた次回。

## 補足
ウチの先生からツッコミ頂きました。
<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/hoto17296">hoto17296</a> 誰にHaskell習ってんだよ。
let fib = 1 : 1 : zipWith (+) fib (tail fib)
sum $ fst $ break (&gt;= 4000000) $ filter even fib</p>&mdash; Terra生まれの丁 (@gotoki_no_joe) <a href="https://twitter.com/gotoki_no_joe/status/340949588708048896">June 1, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
おおお、なんだこの超Haskellっぽいコードは・・・。

`fib = 1 : 1 : zipWith (+) fib (tail fib)`でフィボナッチ数列の無限リストが取ってこれるようだけど、なんでこんなことができるのかはまだよくわからぬ(´・ω・)

メモ化とかモナドとかやる前に、普通にHaskellをもっと書けるようにならないといかんわこれ。
