---
layout: post
title: 'CakePHP+MySQLで論理型(Boolean)を扱う方法'
date: 2012-06-08
tags: [CakePHP, MySQL]
description: 'MySQLのDBを設計してる時に「あれ、論理型なくね？」ってなって、調べてみても ENUM(‘TRUE’, ‘FALSE’)？？？ なんじゃそりゃわけわからんしかもCakePHPじゃ対応してないし(´Д｀)'
---

MySQLのDBを設計してる時に「あれ、論理型なくね？」ってなって、  
調べてみても [ENUM(‘TRUE’, ‘FALSE’)](http://dev.mysql.com/doc//refman/4.1/ja/enum.html)？？？
なんじゃそりゃわけわからん  
しかもCakePHPじゃ対応してないし(´Д｀)
ってなってたら、知り合いのエンジニアの人が

> TINYINT(1)使うといいよ

って教えてくれた。

なんでもMySQLのDB設計するときは **TINYINT(1)=Bool型** らしい。  
<del>知らねーよ(´Д｀)</del>

で、試しにTINYINT(1)でやってみたら、
Modelをbakeしたときにbool型として認識してくれる！！

Viewで

``` php
<?=$this->Form->input('フィールド名')?>
```

ってやるだけで勝手にチェックボックスで出力してくれる！！

えっ 何これスゴい。
ちょっと見直したよCakePHP。
