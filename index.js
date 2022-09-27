var fs = require('fs');
var uglify = require('uglify-js');

var files = {
  "calculos": fs.readFileSync('src/js/calculos.js'),
  "controls": fs.readFileSync('src/js/controls.js'),
  "indicador": fs.readFileSync('src/js/indicador.js'),
}
// var result = UglifyJS.minify(["calculos.js", "controls.js", "indicador.js", "oitavas.js", , "particle.js", "sketch.js"]);
var uglified = uglify.minify(files, {compress: true});
if (uglified.error) { 
    console.log(uglified.error);
} else {
    console.log('tudo bem')
}

// fs.writeFileSync("output.min.js", uglified.code);
