---
layout: post
title: 'DOM操作できない jQuery をつくる'
date: 2015-04-19
tags: [jQuery,JavaScript,Ajax]
description: 'jQuery の Ajax 部分だけがほしい'
image: 'jquery-ajax.png'
---

最近のネタは社内 Qiita:Team に書いていたので超ひさしぶりの更新になりました(言い訳

## Ajax ライブラリとしての jQuery
最近 React.js にハマって仮想DOMを覚えてからというもの jQuery でのDOM操作をめっきりしなくなって、
jQuery は Ajax のときくらいしか使わないのでもはや Ajax 用ライブラリと化してきているわけです。

しかしそうなってくると jQuery みたいな巨大なもんを読み込むのがそもそも無駄で、
Ajax 専用のライブラリを使えばいいじゃんって話になってくるんですけど、
いろいろあって今までの jQuery での Ajax のインタフェースも捨てがたいわけです。

要するに、**jQuery の Ajax 部分だけがほしい**、と。

## Ajax だけ切り出したカスタム jQuery を作る
というわけで jQuery のカスタムビルドを作ります。

GitHub から jQuery のソースを落としてきて

```
$ git clone git://github.com/jquery/jquery.git
$ cd jquery
$ git checkout 2.1-stable
```

Ajax に必要ない機能を除外してビルドします。

```
$ grunt custom:-css,-deprecated,-dimensions,-effects,-event,-offset,-wrap,-sizzle
```

カスタムビルドについては以下のエントリが詳しいです。

> [jQueryのカスタムビルド機能を用いて、小さなサイズのjQueryを使おう！ - YoheiM .NET](http://www.yoheim.net/blog.php?q=20140801)

## 切り出した結果
```
$ grunt compare_size
Running "compare_size:files" (compare_size) task
   raw     gz Sizes
119504  36210 dist/jquery.js
 41076  14604 dist/jquery.min.js

   raw     gz Compared to 2.1-stable @ 64f7d10980a5e9f2862f1239a37d95e6c39e37ec
-128101-37325 dist/jquery.js
-43312 -14903 dist/jquery.min.js

   raw     gz Compared to last run
-128101-37325 dist/jquery.js
-43312 -14903 dist/jquery.min.js

Saved as: 2.1-stable
```

サイズが半分くらいになりました。

サイズ的にはまぁこんなもんですが、React.js などの仮想DOMでは基本的に生DOMを直接操作してはいけないので、
誤って生DOMを操作してしまわないように jQuery の機能を落としておくのもアリかもしれません。
