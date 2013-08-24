$(function(){
  var dir = 'sound/shino/mp3/';
  var ext = 'mp3';
  var sounds = {
    'kick':            { color: '0056b9' },
    'snare':           { color: 'ab47cb' },
    'snare_low':       { color: 'eaa8ff' },
    'snare_cr':        { color: 'a3d771' },
    'snare_or':        { color: 'a3d771' },
    'high_tom':        { color: '489dff' },
    'mid_tom':         { color: '0a7bff' },
    'floor_tom':       { color: '016fde' },
    'ohh_edge':        { color: 'ff5817' },
    'chh_edge':        { color: 'ff7964' },
    'crash_cymbal-l':  { color: 'ffbf4d' },
    'crash_cymbal-r':  { color: 'ffbf4d' },
    'china_cymbal':    { color: 'ff5817' },
  };
  var map = {
     32: 'kick', // space
     71: 'snare', // g
     72: 'snare', // h
     70: 'snare_low', // f
     86: 'snare_low', // v
     66: 'snare_low', // b
     78: 'snare_low', // n
     74: 'snare_low', // j
     67: 'snare_cr', // c
     77: 'snare_or', // m
     53: 'high_tom', // 5
     54: 'high_tom', // 6
     82: 'high_tom', // r
     84: 'high_tom', // t
     89: 'high_tom', // y
     56: 'mid_tom', // 8
     57: 'mid_tom', // 9
     85: 'mid_tom', // u
     73: 'mid_tom', // i
     79: 'mid_tom', // o
     75: 'floor_tom', // k
     76: 'floor_tom', // l
    186: 'floor_tom', // +
    188: 'floor_tom', // <
    190: 'floor_tom', // >
     65: 'ohh_edge', // a
     83: 'ohh_edge', // s
     68: 'chh_edge', // d
     90: 'chh_edge', // z
     88: 'chh_edge', // x
     50: 'crash_cymbal-l', // 2
     51: 'crash_cymbal-l', // 3
     81: 'crash_cymbal-l', // q
     87: 'crash_cymbal-l', // w
     69: 'crash_cymbal-l', // e
    189: 'crash_cymbal-r', // =
    187: 'crash_cymbal-r', // ~
     80: 'crash_cymbal-r', // p
    219: 'crash_cymbal-r', // @{
    221: 'crash_cymbal-r', // }
     13: 'china_cymbal', // Enter
  };

  var objects = {};
  $.each(sounds, function( sound, option ){
    var path = dir + sound + '.' + ext;
    objects[sound] = new Audio(path);
  });

  $(window).keydown(function(key){
    var sound = map[key.keyCode];
    if (!sound){ return }
    var audio = objects[sound];
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    flash(sounds[sound].color);
    return false;
  });

  function flash(color){
    $("body")
      .css({ 'background-color': "#"+color })
      .animate({ backgroundColor: "#999" });
  }
});
