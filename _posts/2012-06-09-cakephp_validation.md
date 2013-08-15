---
layout: post
title: 'CakePHP2でバリデーションエラーを取得する方法まとめ'
date: 2012-06-09
tags: [CakePHP]
---

CakePHPのバリデーション機能って便利だよね。

でもvalidate()した後に結果を取得しようとすると、

- 「あれ、valida**te**Errors だっけ？ valida**tion**Errors だっけ？」
- 「そのフィールドがある場所って Controller だっけ？ Model だっけ？」
- 「どんな形式で取得できたっけ？？？」

などと、いつも <del>記憶力の無さを露呈</del> 混乱するので、忘れないように全部まとめてみた。

<!--more-->

## モデルにもコントローラにもある
そもそもが validationErrors？なるフィールドがどこにあるのかから迷うわけだが、

調べてみたところ**どっちにもあるじゃねーか**。

モデルにあるやつ

- $validate
- $validationErrors
- function validates()

コントローラにあるやつ

- $validationErrors
- function validate()
- function validateErrors()

## モデルにあるやつ
### $validate
バリデーションの設定をするフィールド。おなじみ。

### $validationErrors
バリデーション後にエラーメッセージが格納される場所。
↓ こんな感じで取得できる

``` php
Array
(
    [フィールド名] => Array
        (
            [0] => えらー！！
        )
)
```

### function validates()
現在モデルに登録されている内容でバリデーションを実行する。
エラーがなければ **true** 、エラーがひとつでもあれば **false** を返す。

## コントローラにあるやつ
###$validationErrors
**コントローラの** validate(), validateErrors() を実行した時はここにもエラーメッセージが格納される。
モデルでバリデーションしただけじゃ格納されなかったりするので、このフィールドはあまり参照しないほうが良さげ。
コントローラ内でエラーメッセージを取得したいなら後述の validateErrors() で。

### function validate( モデル1, モデル2, ... )
バリデーションを実行して、**エラーの数**を返す。

### function validateErrors( モデル1, モデル2, ... )
バリデーションを実行して、**エラーメッセージ**を返す。
↓ 取得できる形式はモデルの $validationErrors と同じ。

``` php
Array
(
    [フィールド名] => Array
        (
            [0] => えらー！！
        )
)
```

# まとめ
モデル内だったら validates() して $validationErrors 、コントローラ内だったら validateErrors() でOKっぽい。

場所によって valida<strong>te</strong> だったり valida<strong>tion</strong> だったり、本当にややこしい事この上ないな。

かしこ
