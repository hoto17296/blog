---
layout: post
title: 'zshで真っ黒な世界がカラフルに色づく話'
date: 2014-12-14
tags: [zsh, iTerm, ヌマクロー]
description: 'zsh Advent Calendar 2014 14日目の記事です。'
image: 'zsh_colorful.png'
---

[zsh Advent Calendar 2014](http://qiita.com/advent-calendar/2014/zsh)
14日目の記事です。


アニメ「四月は君の嘘」おもしろいですね。

公生 や かおりちゃん がカラフルな青春を謳歌しているさなか、
我々エンジニアは真っ黒な世界(ターミナル)で謎の文字列達と日々戯れているわけです。

我々の日常も、もっとカラフルにしていくべきではないでしょうか。


## 本題
というわけで、カラフルなヌマクローさんがターミナルを見守ってくれる zsh スクリプトです。(iTerm専用)

![](/images/iterm_numakuro.gif)

``` sh
autoload -Uz add-zsh-hook

function numakuro-init {
  [[ -n $NUMAKURO ]] && return
  export NUMAKURO=0
  add-zsh-hook precmd numakuro-next
}

function numakuro-next {
  local numakuropath
  numakuropath="${HOME}/Pictures/numakuro/${NUMAKURO}.png" # 背景画像のパス
  osascript <<EOF
    tell application "iTerm"
      tell the current terminal
        tell the current session
          set background image path to "${numakuropath}"
        end tell
      end tell
    end tell
EOF
  export NUMAKURO=$(( ($NUMAKURO+1)%12 )) # 画像が12枚の場合
}
```

`numakuro-init` を実行すると、ターミナルの背景にヌマクローが現れます。

ご活用ください。


## 謝辞
クソの役にも立たぬ上、そもそも zsh ネタなのかどうかも怪しいネタ記事でサーセン(´･\_･`)

以下に、大真面目に使っている zshrc と大真面目に書いた zsh 記事を載せておくので勘弁してください。

> - [GitHub - hoto17296 / setup / dotfiles / zshrc](https://github.com/hoto17296/setup/blob/master/dotfiles/zshrc)
> - [GitHub - hoto17296 / setup / dotfiles / zshrc.osx](https://github.com/hoto17296/setup/blob/master/dotfiles/zshrc.osx)
> - [GitHub - hoto17296 / setup / dotfiles / zshrc.peco](https://github.com/hoto17296/setup/blob/master/dotfiles/zshrc.peco)
> - [pecoでファイルパスを選択してよしなに挿入してくれるzshrc設定書いた](/blog/peco_select_path/)
> - [\[Mac\] コマンドを実行するたびに英数モードに切り替えるzshrc設定](/blog/zsh_force_alphanumeric/)

ちなみに、万が一「カラフルヌマクローの画像が欲しい」という物好きな方がおられましたら
[ご一報](https://twitter.com/hoto17296)
ください。


> [zsh Advent Calendar 2014](http://qiita.com/advent-calendar/2014/zsh)

> - 6日目 [Zsh - cat や less より賢いページャ richpager を使う](http://qiita.com/b4b4r07/items/c32a911d7d40907ae3b5)
