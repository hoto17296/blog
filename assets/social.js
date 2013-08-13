(function (w, d) {
  w._gaq = [["_setAccount", "UA-32474136-1"],["_trackPageview"]];
  w.___gcfg = {lang: "ja"};
  var s, e = d.getElementsByTagName("script")[0],
  a = function (u, i) {
  if (!d.getElementById(i)) {
    s = d.createElement("script");
    s.src = u;
    if (i) {s.id = i;}
      e.parentNode.insertBefore(s, e);
    }
  };
  a(("https:" == location.protocol ? "//ssl" : "//www") + ".google-analytics.com/ga.js", "ga");
  a("https://apis.google.com/js/plusone.js");
  a("//b.st-hatena.com/js/bookmark_button_wo_al.js");
  a("//platform.twitter.com/widgets.js", "twitter-wjs");
  a("//connect.facebook.net/ja_JP/all.js#xfbml=1", "facebook-jssdk");
})(this, document);
