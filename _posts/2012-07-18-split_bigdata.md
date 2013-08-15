---
layout: post
title: 'Macの大容量ファイルをWindowsに転送する方法'
date: 2012-07-18
tags: [Mac]
---

MacとWindowsでマトモに互換のあるファイルフォーマットってFAT32くらいなんですが、そのFAT32は１ファイルあたりのサイズ上限が4GBなんですよね(-＿-;)

じゃあMacからWindowsに4GB以上のファイルを転送するにはどうすればいいのかというと、いろいろ方法はあるのですが、今回は分割して転送することにします。

まず、Macの[splitコマンド](http://itpro.nikkeibp.co.jp/article/COLUMN/20060227/230888/)でファイルを分割します。

``` bash
split -b 1000m filename
```

すると、ひとつ1GBの xaa, xab, xac... というファイルに分割されるので、それをWindowsに転送します。

Windows側では、[copyコマンド](http://itpro.nikkeibp.co.jp/article/Windows/20051025/223345/)を使うとファイルを結合することができます。

``` bash
copy /b xaa+xab+xac+... filename
```

簡単ですね＼(^o^)／

### 参考文献
[Macで作った大きなファイルをWindowsへ分割して転送する｜ロケッこがゆく](http://blog.syo-ko.com/?eid=1247)
