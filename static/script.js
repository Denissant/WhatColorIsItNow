$(document).ready(function() {
  clockUpdate();
  setInterval(clockUpdate, 1000);
})

function clockUpdate() {
  var date = new Date();
  $('#digital-clock').css('color: #000000');

  function addZero(x) {
    if (x < 10) {
      return x = '0' + x;
    } else {
      return x;
    }
  }

  // function twelveHour(x) {
  //   if (x > 12) {
  //     return x = x - 12;
  //   } else if (x == 0) {
  //     return x = 12;
  //   } else {
  //     return x;
  //   }
  // }

  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());
  var color = '#' + String(h) + String(m) + String(s*4);


  $('#digital-clock').text(h + ':' + m + ':' + s);
  $('.dynamicbg').css({'background-color': color});
  $('.dynamictext').css({'color': color});
}
