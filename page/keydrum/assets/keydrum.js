$(function(){
  var dir = 'sound/kb/mp3/';
  var ext = 'mp3';
  var sounds = {
    'kick':           { color: '0056b9' },
    'snare':          { color: 'ab47cb' },
    'snare_low':      { color: 'eaa8ff' },
    'sticks':         { color: 'a3d771' },
    'tom_high':       { color: '489dff' },
    'tom_mid':        { color: '0a7bff' },
    'tom_low':        { color: '016fde' },
    'hihat_open':     { color: 'ff5817' },
    'hihat_closed':   { color: 'ff7964' },
    'cymbal_crash_l': { color: 'ffbf4d' },
    'cymbal_crash_r': { color: 'ffbf4d' },
    'cymbal_chinese': { color: 'ff5817' },
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
     67: 'sticks', // c
     77: 'sticks', // m
     53: 'tom_high', // 5
     54: 'tom_high', // 6
     82: 'tom_high', // r
     84: 'tom_high', // t
     89: 'tom_high', // y
     56: 'tom_mid', // 8
     57: 'tom_mid', // 9
     85: 'tom_mid', // u
     73: 'tom_mid', // i
     79: 'tom_mid', // o
     75: 'tom_low', // k
     76: 'tom_low', // l
    186: 'tom_low', // +
    188: 'tom_low', // <
    190: 'tom_low', // >
     65: 'hihat_open', // a
     83: 'hihat_open', // s
     68: 'hihat_closed', // d
     90: 'hihat_closed', // z
     88: 'hihat_closed', // x
     50: 'cymbal_crash_l', // 2
     51: 'cymbal_crash_l', // 3
     81: 'cymbal_crash_l', // q
     87: 'cymbal_crash_l', // w
     69: 'cymbal_crash_l', // e
    189: 'cymbal_crash_r', // =
    187: 'cymbal_crash_r', // ~
     80: 'cymbal_crash_r', // p
    219: 'cymbal_crash_r', // @{
    221: 'cymbal_crash_r', // }
     13: 'cymbal_chinese', // Enter
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
