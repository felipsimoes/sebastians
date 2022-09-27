// ————————————————————————————————————————————————————————————
// title: Octaves Soundviz
// author: Werllen Castro
// github.com/werls
// 2022
// ————————————————————————————————————————————————————————————
// based on the original idea and design of Sebastião Camilo
// ————————————————————————————————————————————————————————————
// pitch detection using the CREPE model with ml5.js in the way
// described by Daniel Shiffman in CodingChallenge 151
// https://www.youtube.com/watch?v=F1OkDTUkKFo
// ————————————————————————————————————————————————————————————

const model_url = './lib/crepe/'
let pitch
let mic
let freq = 0
let amplitude = 0
let audioContextStart = false
let BG_OPACITY = 0.1
let DEBUG = false
let HELP = false
let VARIATION = 1
let HARMONICS = false
let INDICATOR_MIN_SIZE = 0
let INDICATOR_MAX_SIZE = 300
// Definir o valor do range total
const globalRange = {
  min: oitavas[0].min,
  max: oitavas[oitavas.length - 1].max
}


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  background(0);
  noStroke();
 
  
 

  modulo = {
    x: 0,
    y: 0,
    color: color(0, 0, 0)
  }
  
  // for (let i = 0; i < 4; i++) {
  //   harmonics.push(new Particle());
  // }
  
  indicador = new Indicador();
  
  // Definir uma altura fixa de Y para cada oitava
  for (oitava of oitavas) {
    oitava.height = height / oitavas.length
    oitava.y = {
      min: oitava.height * oitava.n,
      max: oitava.height * oitava.n + oitava.height
    }
  }
  
  audioContext = getAudioContext();
  audioContext.suspend();
  console.log(`audioContext State: ${audioContext.state}\n`)
  
  // spectrum = getSpectrum();// drawSpectrum();
}

function draw() {
  background(0, 0, 0, BG_OPACITY)
  
  if (audioContextStart) {
    indicador.sizeMin = INDICATOR_MIN_SIZE
    // indicador.maxSize = INDICATOR_MAX_SIZE
    indicador.freq = freq
    getModulo(freq)

    if (HARMONICS) {
      indicador.harmonics = true
    } else {
      indicador.harmonics = false
    }

    fill(255, 0.2);
    textSize(13)
    textFont("elza-light")
    textAlign(CENTER, CENTER);
    text("h = série harmônica  |  ↑ ↓ = ver caminho", width/2, height * 0.98)

  } else {
    push()
    //fill(255)
    textAlign(CENTER, CENTER);

    textFont("elza-thin");
    if (dist (width / 2, height * 0.45 ,mouseX,mouseY) < 100)
    {fill(255, 255, 255, 0.04);
    //hover
    textFont("elza-light");
    ellipse (width * 0.43, height * 0.35, 30,30)
    ellipse (width * 0.44, height * 0.56, 50,50)
    ellipse (width * 0.57, height * 0.49, 10,10)
    }
    else {fill(255, 255, 255, 0.01);
    //normal

    }

    ellipseMode(CENTER)
    ellipse (width / 2, height * 0.45, 200,200)
    //ellipse (width * 0.43, height * 0.35, 30,30)

    

    


    fill (255, 0.3)
    
    textSize(15);
    text('clique para ver som', width / 2, height * 0.45,)

    textAlign(LEFT);
    textFont("elza-medium");
    textSize(25);
    text('SEBASTIÃO CAMILO | DESIGN GENERATIVO SONS E CORES ', 50, 50);
    
    textFont("elza-extralight");
    textSize(20);
    text('ola@sebastiaocamilo.com | @ _sebastiaocamilo', 50, 90)

    textAlign(CENTER, CENTER);
    textFont("elza-thin");
    textSize(25);
    rectMode(CENTER);

    text('Todas as notas musicais que ouvimos tem sua própria afinação. \n \n Se elevarmos essa afinação até a velocidade da luz, encontraremos as cores que acontecem em cada nota. \n \n Qualquer som emitido é constituído por outros sons que vibram junto com ele. \n Essa sequência é chamada de série harmônica.', width/2, height * 0.75, 840);
    
   // button.mousePressed(changeBG);

    pop()
  }

  if (DEBUG) {
    debugInfo()
  }

  if (HELP) {
    helpInfo()
  }
}

function getModulo(freq) {
  // start = new Date().getTime()
  for (oitava of oitavas) {
    if (freq > oitava.min && freq < oitava.max) {
      // cor
      var clr = transformHtztoColor(freq);
      // fill(clr);
      
      // posição
      var x = map(freq, oitava.min, oitava.max, 0, width);
      
      modulo = {
        x: x,
        y: height - oitava.y.min,
        color: clr
      }
      
      indicador.update(modulo);
      indicador.show();
      // return _modulo
    }
  }
}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}

function debugInfo() {
  push()
  fill(0)
  rect(0, 0, 200, 200)
  fill(255)
  text(`BG Opacity: ${BG_OPACITY} \nOctaves: ${oitavas.length} \nFrequency: ${freq.toFixed(2)} \nAmplitude: ${amplitude.toFixed(2)} \nFPS: ${frameRate().toFixed(0)} \nCoordX: ${modulo.x.toFixed(0)} \nCoordY: ${modulo.y.toFixed(0)} \nVariation: ${VARIATION} \nHarmonics: ${HARMONICS} \nIndicator Min Size: ${INDICATOR_MIN_SIZE}`, 10, 20)
  pop()
}

function helpInfo() {
  push()
  fill(0)
  rect(0, height - 200, 250, height)
  fill(255)
  text('UP/DOWN ARROW: Change opacity \nH: Show harmonics \n1-2: Change indicator \nZ: Decrease minimum size \nX: Increase minimum size \nD: Debug', 10, height - 200 + 20)
  pop()
}

function mousePressed() {
  userStartAudio()
  audioContext.resume()
    
  console.log(`audioContext State: ${audioContext.state}\n`) 
  mic = new p5.AudioIn();
  mic.start(listening);
  audioContextStart = true;
  
  // setTimeout(() => { 
  //   console.log(`audioContext State: ${audioContext.state}\n`) 
  //   mic = new p5.AudioIn();
  //   mic.start(listening);
  //   audioContextStart = true;
  // }, 1000)
}
