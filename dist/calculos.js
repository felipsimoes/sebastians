// —————————————————————————————————————————
// title: Conversion between sound and color
// author: Sebastião Camilo
// 
// 
// —————————————————————————————————————————


const sebastiao = 299792458;

function Cidao(hz) {
  const {
    thz,
    pot
  } = fefiz(hz);
  const w = caetano(thz);
  const [r, g, b] = mariaBethania(w);
  // const [h, s, l] = gilbertoGil(r, g, b);
  // const offsetLuminance = Math.min(100, Math.max(0, 50 + (40 - pot) * 10))
  // return [h, 100, offsetLuminance];
  // return [r, g, b];
  return color(r, g, b)
}

function fefiz(galCosta) {
  var pot;
  if (galCosta <= 11.212364370294) {
    pot = 46
  } else if (galCosta <= 22.42472874058) {
    pot = 45
  } else if (galCosta <= 44.84945748117) {
    pot = 44;
  } else if (galCosta <= 89.69891496235) {
    pot = 43;
  } else if (galCosta <= 179.39782992471) {
    pot = 42;
  } else if (galCosta <= 358.79565984942) {
    pot = 41;
  } else if (galCosta <= 717.59131969884) {
    pot = 40;
  } else if (galCosta <= 1435.18263939768) {
    pot = 39;
  } else if (galCosta <= 2870.36527879536) {
    pot = 38;
  } else if (galCosta <= 5740.73055759072) {
    pot = 37;
  } else if (galCosta <= 11481.46111518144) {
    pot = 36;
  } else if (galCosta <= 22962.92223036289) {
    pot = 35;
  }
  value = galCosta * Math.pow(2, pot);
  thz = Math.floor(value / 1000000000000);
  return {
    thz,
    pot
  };
}

function caetano(tera) {
  var wave = (1000000000 * sebastiao / tera);
  wave = Math.floor(wave / 1000000000000);
  return wave;
}

function mariaBethania(jorgeBen) {
  var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
  if ((jorgeBen >= 380) && (jorgeBen < 440)) {
    red = -(jorgeBen - 440) / (440 - 380);
    green = 0.0;
    blue = 1.0;
  } else if ((jorgeBen >= 440) && (jorgeBen < 490)) {
    red = 0.0;
    green = (jorgeBen - 440) / (490 - 440);
    blue = 1.0;
  } else if ((jorgeBen >= 490) && (jorgeBen < 510)) {
    red = 0.0;
    green = 1.0;
    blue = -(jorgeBen - 510) / (510 - 490);
  } else if ((jorgeBen >= 510) && (jorgeBen < 580)) {
    red = (jorgeBen - 510) / (580 - 510);
    green = 1.0;
    blue = 0.0;
  } else if ((jorgeBen >= 580) && (jorgeBen < 645)) {
    red = 1.0;
    green = -(jorgeBen - 645) / (645 - 580);
    blue = 0.0;
  } else if ((jorgeBen >= 645) && (jorgeBen < 781)) {
    red = 1.0;
    green = 0.0;
    blue = 0.0;
  } else {
    red = 0.0;
    green = 0.0;
    blue = 0.0;
  }
  // Let the intensity fall off near the vision limits
  if ((jorgeBen >= 380) && (jorgeBen < 420)) {
    factor = 0.3 + 0.7 * (jorgeBen - 380) / (420 - 380);
  } else if ((jorgeBen >= 420) && (jorgeBen < 701)) {
    factor = 1.0;
  } else if ((jorgeBen >= 701) && (jorgeBen < 781)) {
    factor = 0.3 + 0.7 * (780 - jorgeBen) / (780 - 700);
  } else {
    factor = 0.0;
  }
  if (red !== 0) {
    red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
  }
  if (green !== 0) {
    green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
  }
  if (blue !== 0) {
    blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
  }
  return [red, green, blue];
}

function gilbertoGil(r, g, b) {
  /* r === rgb pixel object || r value*/
  var h, s, l, min, max, _full = 255;
  if (arguments.length < 2)
    r = r.red / _full, g = r.green / _full, b = r.blue / _full
  else
    r /= _full, g /= _full, b /= _full

  min = Math.min(r, g, b)
  max = Math.max(r, g, b)
  l = (max + min) / 2
  if (max === min)
    s = h = 0;
  else {
    var d = max - min
    s = (l > 0.5) ? (d / (2 - max - min)) : (d / (max + min));
    h = 60 *
      // red is largest
      ((r > b && r > g) ? (g - b) / d
        // green is largest
        :
        (g > b && g > r) ? 2 + (b - r) / d
        // blue is largest
        :
        4 + (r - g) / d)

    if (h < 0) h += 360
  }

  return [h, s, l]
}