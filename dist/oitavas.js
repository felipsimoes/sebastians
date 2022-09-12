const oitavas = [
    {
      n: 0,
      min: 11.212364370294,
      max: 22.42472874058
    },
    {
      n: 1,
      min: 22.42472874059,
      max: 44.84945748118
    },
    {
      n: 2,
      min: 44.84945748118,
      max: 89.69891496236
    },
    {
      n: 3,
      min: 89.69891496236,
      max: 179.39782992472
    },
    {
      n: 4,
      min: 179.39782992472,
      max: 358.79565984943
    },
    {
      n: 5,
      min: 358.79565984943,
      max: 717.591319698853
    },
    {
      n: 6,
      min: 717.59131969885,
      max: 1435.18263939769
    },
    {
      n: 7,
      min: 1435.18263939769,
      max: 2870.36527879537
    },
    {
      n: 8,
      min: 2870.36527879537,
      max: 5740.73055759073
    },
    {
      n: 9,
      min: 5740.73055759073,
      max: 11481.46111518145
    },
    {
      n: 10,
      min: 11481.46111518145,
      max: 22962.92223036289
    }
  ]
  
  function drawSpectrum() {
    let isNewRow = true;
    
    let d = pixelDensity();
    let nRows = oitavas.length;
    let rowHeight = height / nRows;
    
    loadPixels();
    row = -1;
    for (let y = 0; y < height * d; y++) {
      for (let x = 0; x < width * d; x++) {
        
        let r = 255;
        let g = 255;
        let b = 255;
        
        let rowObj;
        
        if (row >= 0 && row < oitavas.length) {
          rowObj = oitavas[row];
        } else {
          rowObj = {min: 0, max: 1}
        }
        
        // Espectro de cor considerando apenas a largura do canvas
        // let freq = map(x, 0, width, globalRange.min, globalRange.max);
        
        // Espectro de cores "esticando" cada sequência
        // de oitava para ocupar toda a largura
        let freq = map(x, 0, width, rowObj.min, rowObj.max);
        
        let clr = transformHtztoColor(freq);
        
        if (!isNewRow) {
          r = clr[0];
          g = clr[1];
          b = clr[2];
        }
        
        let index = (x + y * width) * 4 * d;
        pixels[index + 0] = r;
        pixels[index + 1] = g;
        pixels[index + 2] = b;
      }
      
      
      // Para cada valor de Y que seja múltiplo
      // da altura do módulo, desenhar uma linha branca
      // if (y % Math.floor(rowHeight) == 0) {
      
      if (y % rowHeight == 0) {
        row++;
        isNewRow = true;
      } else {
        isNewRow = false;
      }
    }
    updatePixels();
  }