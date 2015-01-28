---
layout: post
title: 'pecoでファイルパスを選択してよしなに挿入してくれるzshrc設定書いた'
date: 2014-09-30
tags: [peco, zsh]
description: '最近 peco にドハマりしているのだけど、もはやパスを入力する操作はすべて peco でやってしまおうと思ってこんな .zshrc を書いた。'
image: ''
---

最近 [peco](https://github.com/peco/peco) にドハマりしているのだけど、
もはやパスを入力する操作はすべて `peco` でやってしまおうと思ってこんな `.zshrc` を書いた。

(`peco`って何よ？ って人は [こちら](http://qiita.com/xtetsuji/items/05f6f4c1b17854cdd75b) を見るといいです)

``` sh
export EDITOR=vim # 好きなエディタ

function peco-path() {
  local filepath="$(find . | grep -v '/\.' | peco --prompt 'PATH>')"
  [ -z "$filepath" ] && return
  if [ -n "$LBUFFER" ]; then
    BUFFER="$LBUFFER$filepath"
  else
    if [ -d "$filepath" ]; then
      BUFFER="cd $filepath"
    elif [ -f "$filepath" ]; then
      BUFFER="$EDITOR $filepath"
    fi
  fi
  CURSOR=$#BUFFER
}

zle -N peco-path
bindkey '^f' peco-path # Ctrl+f で起動
```

## 状況に応じて3パターンの動作をする
`Ctrl+f` で `peco` が起動して、
カレントディレクトリ以下のファイルとディレクトリを選択できるのだけど、
選択したあとは状況に応じて3パターンの動作をする。

### ファイルを選択すると、`vim` が補完される

![ファイルを選択](/images/peco_file.gif)

`.zshrc` で `export EDITOR=vim` していると、`vim` が補完されてファイルを編集することができる。

もちろん他のエディタでも可。

### ディレクトリを選択すると、 `cd` が補完される

![ディレクトリを選択](/images/peco_dir.gif)

これと `setopt auto_cd` と `popd`コマンド でディレクトリ移動が捗る。

### コマンド入力途中で呼び出すと、パスだけを挿入する

![コマンドの途中でパスを挿入](/images/peco_path.gif)

汎用的に使える。

## まとめ
`peco`、ハマると本当に手放せなくなるので騙されたと思って使ってみるといいです。
