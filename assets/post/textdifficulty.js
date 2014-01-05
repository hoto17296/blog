$(function(){
  var url = 'http://textdifficulty.herokuapp.com/?callback=?';

  $('#TextDifficulty').submit(function(e){
    e.preventDefault();
    var self = this;
    $('.result', self).html('');
    if (this.text.value==''){ return; }
    $('.loading', self).show();
    $.getJSON(url, { str: this.text.value }, function(json){
      $('.loading', self).hide();
      var result = 'この文章は： <b>' + level(json.level) + '</b>';
      $('.result', self).html(result);
    });
  });

  function level(val){
    switch (val) {
      case 0:  return 'かんたんだね( ´ー｀)';
      case 1:  return '普通(･_･)';
      case 2:  return '難しいね！(ﾟДﾟ;)';
      default: return '超難しいね！！((((ﾟДﾟ;))))';
    }
  }
})
