---
layout: post
title: 'Ctrl+D でログアウトしないようにする'
date: 2015-02-09
tags: [zsh, bash]
description: '端末のキーバインドに `Ctrl+S` とか `Ctrl+F` を割り当てていると、誤って `Ctrl+D` を押してしまって強制ログアウトしてしまうことがよくあります。'
image: ''
---

どうも Zsh おじさんです。

端末のキーバインドに `Ctrl+S` とか `Ctrl+F` を割り当てていると、誤って `Ctrl+D` を押してしまって強制ログアウトしてしまうことがよくあります。

これをやらかすとかなりつらい気持ちになるのですが、これは設定ファイルに以下のように書くと回避することができます。

## Bash の場合
``` sh
export IGNOREEOF=1
```

※ 試してないので、できなかったら「bash ignoreeof」とかでググってなんとかしてください(雑
※ 値が `1` なのは「１回まで `Ctrl+D` を無視する」という意味らしいです。２回連続で `Ctrl+D` を押すとログアウトします(たぶん)

## Zsh の場合
``` sh
setopt ignoreeof
```

※ なぜか、10回連続で `Ctrl+D` を押すとログアウトする仕様です。
