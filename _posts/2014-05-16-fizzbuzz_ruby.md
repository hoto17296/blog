---
layout: post
title: '【49bytes】Rubyで最短FizzBuzz'
date: 2014-05-16
tags: [Ruby, FizzBuzz]
description: ''
image: ''
---

``` ruby
100.times{|n|puts'FizzBuzz
'[i=n**4%-15,i+13]||n}
```

「Ruby FizzBuzz」でググったら
[51bytesが最短](http://cui.daa.jp/ruby-fizz-buzz-50)
って書いてあったんだけど、
`1.upto(100)` を `100.times` にした方が2bytes削れることね？
と思った。

地味だけど。

※ なぜこのコードが動くかの解説は[こちら](http://qiita.com/manuluu/items/151167640fcd909d0c47)
