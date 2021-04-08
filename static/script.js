$(document).ready(function() {
  clockUpdate();
  setInterval(clockUpdate, 1000);
})


function convertHex(n) {
  // converts a 0-255 number to a 2-symbol HEX code
  // returns a string of the following format: 8B1E57 (without hash sign – #)
  var letters = ['A', 'B', 'C', 'D', 'E', 'F'] // symbols used in HEX codes. A=10, B=11... F=15
  var t = 0
  var x = 0

  if (n > 255) {
    n = 255
  }
  if (n < 1) {
    n = 0
  }

  if (n < 16) {
    if (n > 9) {
    n = '0' + letters[n - 10]
    }
    else {
    n = '0' + String(n)
    }
  }

  else if (n < 160) {
    t = Math.floor(n / 16)
    x = n % 16
    if (x > 9) {
      n = String(t) + letters[x - 10]
    }
    else {
      n = String(n - (t * 6))
    }
  }

  else {
      t = Math.floor((n - 160) / 16)
      n = (n - 160) % 16
      if (n > 9) {
      n = letters[t] + letters[n - 10]
      }
      else {
      n = letters[t] + String(n)
      }
  }
  return n
}

function generateColor(h, m, s) {
  // returns a HEX color code depending on time, uses convertHex
  // h = hours, m = minutes, s = seconds. 24-hour format
  // colors are the lightest at 12 a.m. and darkest at 12 a.m.

  var blueS = 0
  var greenS = 0
  var redS = 0

  // relatively increases h based on its difference from 12 a.m.
  if (h > 12) {
    h = h - 11
  }
  else {
    h = 13 - h
  }
  //


  // makes second-dependent color changes subtly bounce back every minute
  // instead of colors suddenly changing after xx:xx:59, the seconds-based color-changing flow will reverse its direction
  // on even minutes, blue positively correlates with seconds. same for odd minutes and green
  // 30th second causes the same amount of blue, green and red on any minute (minutes cause other changes independently)
  // e.g.: xx:x1:59 will cause more blue but xx:x2:59 will cause more green
  if (m % 2 === 0) {
    blueS = 255 - (s * 4.25)
    greenS = s * 4.25
    redS = 255 - (s * 4.25)
  }
  else {
    blueS = s * 4.25
    greenS = 255 - (s * 4.25)
    redS = 4.25
  }
  //

  // converting 0-12 format to 0-255 to keep the percentage while reaching the whole spectrum of colors
  var redH = h * 10.625

  // converting 0-60 format to 0-255 to keep the percentage while reaching the whole spectrum of colors
  var redM = m * 4.25
  var blueM = 255 - (m * 4.25)
  var greenM = m * 4.25

  // some adjustments to red based on seconds
  if (s > 55) {
    redH = redH - 13
  } else if (s > 50) {
    redH = redH - 21
  } else if (s > 45) {
    redH = redH - 28
  } else if (s > 40) {
    redH = redH - 35
  } else if (s > 35) {
    redH = redH - 32
  } else if (s > 30) {
    redH = redH - 28
  } else if (s > 25) {
    redH = redH - 24
  } else if (s > 20) {
    redH = redH - 20
  } else if (s > 15) {
    redH = redH - 13
  } else if (s > 10) {
    redH = redH - 8
  } else if (s > 5) {
    redH = redH - 5
  }
  //

  // generate numbers from 0 to 255 for each color, depending on h,m,s
  var red = (230 - redH + (redS * 0.01) + (redM * 0.01))
  var green = (greenS * 0.65) + ((greenM+(h/2)) * 0.35)
  var blue = (blueS+(h/2) * 0.35) + (blueM * 0.65)

  // make colors darker based on the hour of the day and convert to HEX codes
  red = convertHex(Math.floor(red - (red * 0.5 * (h/8.5))))
  green = convertHex(Math.floor(green - (green * 0.5 * (h/6.5))))
  blue = convertHex(Math.floor(blue - (blue * 0.5 * (h/7.3))))

  // returns a string, needs '#' in front
  return red + green + blue
}


function clockUpdate() {
  // fetches date, uses generateColor with the date, makes changes to the website
  var date = new Date();
  $('#mainclock').css('color: #000000');

  function addZero(x) {
    // adds a zero in front of one-digit numbers
    if (x < 10) {
      return x = '0' + x;
    } else {
      return x;
    }
  }


  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  var colorcode = generateColor(h, m, s);
  var hexcolor = '#' + colorcode;


  $('#mainclock').text(h + ':' + m + ':' + s);
  $('.dynamicbg').css({'background-color': hexcolor});
  $('#loadingtext').css({'color': hexcolor});
  $('#hexinfo').text(hexcolor);
}
