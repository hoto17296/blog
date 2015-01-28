---
layout: post
title: '[Mac] コマンドを実行するたびに英数モードに切り替えるzshrc設定'
date: 2014-11-01
tags: [Mac,zsh,terminal,IME,英数,alphanumeric]
description: 'コマンド入力時に日本語入力になっていると地味にイラつくので解消した。'
image: 'zsh_force_alphanumeric.png'
---

![](/images/zsh_force_alphanumeric.png)

コマンド入力時に日本語入力になっていると地味にイラつくので解消した。

ただし今回のは **zsh, Mac** でのやり方なので、
bash の人や Windows の人は別のやり方で頑張ってほしい。

## やり方
やり方と言っても本当に簡単で、`.zshrc` に以下の設定を書くだけ。

``` sh
autoload -Uz add-zsh-hook

function force-alphanumeric {
  case "${OSTYPE}" in
  darwin*)
    # 「英数」キーを押す
    # 若干重いので サブシェル + バックグラウンド で実行する
    (osascript -e 'tell application "System Events" to key code {102}' &)
  esac
}

add-zsh-hook precmd force-alphanumeric
```

## 解説

### precmd
zsh には **precmd** という特殊な関数が用意されていて、
プロンプトを表示する直前に毎回 precmd 関数が呼ばれるようになっている。

`function precmd { ... }` と直接処理を書いてもいいのだけど、
今回は英数入力に切り替える関数(force-alphanumeric)を定義して
**add-zsh-hook** を使って precmd に関数を登録する、という実装にした。

> 参考： [Zsh - precmdを明示的に呼ぶ方法 - Qiita](http://qiita.com/yuyuchu3333/items/b01536fa63d9f8fadf4f)

### osascript
**osascript** は AppleScript を実行するコマンドで、
`-e <文字列>` オプションをつけると与えた文字列を AppleScript のコードとして実行する。

`tell application "System Events" to key code {102}` は、
要するに「英数キー(102)を押せ」という AppleScript だ。

　

AppleScript で英数キーを押す関数 force-alphanumeric を定義してそれを precmd に登録することで、
コマンドを実行するたびに勝手に英数入力に切り替わるようになった。

## 使ってみた結果
コマンド打つときに日本語入力になっててイラつくことがなくなってとてもよい。

が、  
なんというか、もっさりしている・・・

zprof でプロファイルとってみたけど、明らかに AppleScript の実行が重い

他にいい方法ないかなぁ

人によって許容できるかどうか分かれそうなくらいの微妙なもっさり感なので、いったん試してみる価値はあり。
