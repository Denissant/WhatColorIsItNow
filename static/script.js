$(document).ready(function() {
  clockUpdate();
  setInterval(clockUpdate, 1000);
})


function convertHex(n) {
  // converts a 0-255 number to a 2-symbol HEX code
  var letters = ['A', 'B', 'C', 'D', 'E', 'F']
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
  var blueS = 0
  var greenS = 0
  var redS = 0

  if (h > 12) {
    h = h - 11
  }
  else {
    h = 13 - h
  }


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

  var redH = h * 10.625

  var redM = m * 4.25
  var blueM = 255 - (m * 4.25)
  var greenM = m * 4.25


  if (s > 55) {
    redH = redH - 13
  }
  else if (s > 50) {
    redH = redH - 21
  }
  else if (s > 45) {
    redH = redH - 28
  }
  else if (s > 40) {
    redH = redH - 35
  }
  else if (s > 35) {
    redH = redH - 32
  }
  else if (s > 30) {
    redH = redH - 28
  }
  else if (s > 25) {
    redH = redH - 24
  }
  else if (s > 20) {
    redH = redH - 20
  }
  else if (s > 15) {
    redH = redH - 13
  }
  else if (s > 10) {
    redH = redH - 8
  }
  else if (s > 5) {
    redH = redH - 5
  }


  var red = convertHex(Math.floor(230 - redH + (redS * 0.01) + (redM * 0.01)))
  var green = (greenS * 0.65) + (greenM * 0.35)
  var blue = (blueS * 0.35) + (blueM * 0.65)
  var tsg = Math.floor(green - (green * 0.5 * (h/8)))
  var tsb = Math.floor(blue - (blue * 0.5 * (h/11)))

  console.log('testing heeere: ', 'green: ', green, 'final: ', tsg)
  console.log('testing heeere: ', 'blue: ', blue, 'final: ', tsb)
  green = convertHex(Math.floor(green - (green * 0.5 * (h/8))))
  blue = convertHex(Math.floor(blue - (blue * 0.5 * (h/11))))

  return red + green + blue
}


function clockUpdate() {
  var date = new Date();
  $('#mainclock').css('color: #000000');

  function addZero(x) {
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
