function keyPressed() {
    if (keyCode === UP_ARROW) {
      if (BG_OPACITY < 1) {
        BG_OPACITY += 0.05
      }
    } else if (keyCode === DOWN_ARROW) {
      if (BG_OPACITY > 0) {
        BG_OPACITY -= 0.05
      }
    } else if (keyCode === 191) {
      if (HELP) {
        HELP = false  
      } else { 
        HELP = true
      }
    } else if (keyCode === 68) {
      if (DEBUG) {
        DEBUG = false  
      } else { 
        DEBUG = true
      }
    } else if (keyCode === 49) {
      VARIATION = 1
    } else if (keyCode === 50) {
      VARIATION = 2
    } else if (keyCode === 72) {
      if (HARMONICS) {
        HARMONICS = false
      } else {
        HARMONICS = true
      }
    } else if (keyCode === 88) {
      if (INDICATOR_MIN_SIZE <= height) { INDICATOR_MIN_SIZE += 10 }
    } else if (keyCode === 90) {
      if (INDICATOR_MIN_SIZE >= 10) { INDICATOR_MIN_SIZE -= 10 }
    }
  }