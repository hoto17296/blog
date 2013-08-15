---
layout: post
title: 'PHPでFizzBuzz問題'
date: 2012-06-07
tags: [PHP]
---

FizzBuzz問題を知らない方は[こちら](http://ja.wikipedia.org/wiki/Fizz_Buzz 'Fizz Buzz – Wikipedia')

``` php
<?for(;@$i++<100;)echo$i%3?$i%5?$i:'':@Fizz,$i%5?'':@Buzz,"\n";
```

63バイト！

ショートタグとかエラー制御演算子とか使うのアリなのか知らんけどとりあえず動くよ！
これ以上短くできるのかなこれ   

### [2012/7/29追記] どうしようもないbot作りました
[@FizzBuzz_bot](https://twitter.com/FizzBuzz_bot)
5分間隔でFizzBuzzし続けます。
**それだけです。**

 [1]: http://ja.wikipedia.org/wiki/Fizz_Buzz
