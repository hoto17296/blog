---
layout: post
title: 'Firefox29のステータスバーを抹殺する'
date: 2014-05-03
tags: [Firefox, Vimperator]
description: 'Mozillaは世界60億人のプロインターネットサーファーを敵に回した。'
image: 'firefox29_hide_statusbar/1.png'
---

## 事の顛末

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>Firefox 29: 完全な新デザインによる大型アップデート <a href="http://t.co/7ZaoBGOIwx">http://t.co/7ZaoBGOIwx</a>&#10;Firefoxアップデートしたらナビゲーションバー非表示にできなくなっててキレそう&#10;ずっとこのままならChromeへの乗り換えも辞さない</p>&mdash; ほと (@hoto17296) <a href="https://twitter.com/hoto17296/statuses/462177411337957376">May 2, 2014</a></blockquote>

なぜステータスバーが表示できないでキレそうなのかというと、そもそもブラウザにツールバーの類は一切必要ないものだからだ。
タブは [ツリータブ][treetab] を使って横に表示するし、ブラウザの操作は [Vimperator][vimperator] で行うのでキーボードさえあればよい。

[treetab]: https://addons.mozilla.org/ja/firefox/addon/tree-style-tab/
[vimperator]: http://ja.wikipedia.org/wiki/Vimperator

ブラウザはWebページを表示するためのアプリケーションだ。
Webページを表示する領域は広いに越したことはない。
また多くのWebページは縦長なのだから、縦方向は特に広く領域を確保すべきだ。
したがってナビゲーションバーはブラウジングをする上で邪魔でしかない。
ナビゲーションバーというのは、あくまで ぱーそなるこんぴゅーた を使いこなせないビギナーのための補助機能であり、
ぼくたちプロインターネットサーファーには不必要なものだ。

しかしMozillaは世界60億人のプロインターネットサーファーを敵に回した。
Firefox29の新デザイン(通称Australis)で、ステータスバーの非表示をできなくしたのだ。
カスタマイズ性が売りのFirefoxがなんたる失態か。
こんなことは決してあってはならないのだ。

だからぼくたちは今すぐステータスバーを抹殺しなければならない。

## 本題

FirefoxのUIはCSSでデザインされており、`userChrome.css` を編集することで好きなデザインにカスタマイズすることができる。

`userChrome.css` の場所は、
OSがMacなら `~/Library/Application Support/Firefox/Profiles/{なんか英数字}.default/chrome/`
(chromeディレクトリが無ければ新規作成)  
それ以外のOSは [プロファイル | Firefox ヘルプ][profile] を参照。

[profile]: https://support.mozilla.org/ja/kb/profiles-where-firefox-stores-user-data

この `userChrome.css` に以下の４行を追加し、

``` css
#navigator-toolbox:before,
#nav-bar {
  display: none !important;
}
```

Firefoxを再起動すると、

![](/images/firefox29_hide_statusbar/1.png)

無事、ステータスバーを抹殺することができた。

こうして世界の平和は保たれたのだ・・・。

## 参考
> [userchrome.css - Mozilla Firefox まとめサイト](http://firefox.geckodev.org/?cmd=read&page=userchrome.css)
> 
> [DOM Inspectorの使用方法 | Firefoxの開発ツール](http://www.crystal-creation.com/web-app/tech/browser/firefox/developer-tools/dom-inspector/)
> 
> [Firefox 4.0 からは、chromeフォルダが無くなった :: Firefox Fan Club + More Browsers](http://doheny.blog137.fc2.com/blog-entry-85.html)
