let colorBg = 51;
let button;

let lang = 'es-CO';
let speechRec = new p5.SpeechRec(lang);
speechRec.continuous = false; // do continuous recognition
speechRec.interimResults = true; // allow partial recognition (faster, less accurate)
speechRec.onResult = showResult; // bind callback function to trigger when speech is recognized
speechRec.onEnd = onEndResult;

let colorCuadrado;

function setup() {

  createCanvas(200, 200);

  rectMode(CENTER);
  colorCuadrado = color(0, 0, 0, 0);
  
  button = createButton('Start MIC');
  // button.position(width / 2, height / 2);
  button.center('vertical');
  button.mousePressed(startMic);

  // speechRec.start();
}

function draw() {

  background(colorBg);

  noStroke();
  fill(colorCuadrado);
  rect(width / 2, height / 2, 50, 50);
}

function showResult() {

  if (speechRec.resultValue) {

    var mostrecentword = speechRec.resultString.split(' ').pop();
    console.log(speechRec.resultString);
    // console.log(mostrecentword);

    // switch (speechRec.resultString) {
    switch (mostrecentword) {
      case "azul":
        colorCuadrado = color(0, 0, 255);
        break;
      case "rojo":
        colorCuadrado = color(255, 0, 0);
        break;
      case "verde":
        colorCuadrado = color(0, 255, 0);
        break;
      case "cian":
        colorCuadrado = color(0, 255, 255);
        break;
      case "magenta":
        colorCuadrado = color(255, 0, 255);
        break;
      case "amarillo":
        colorCuadrado = color(255, 255, 0);
        break;
      default:
        colorCuadrado = color(0, 0, 0, 0);
    }
  }
}

function onEndResult() {
  console.log("OnEnd"); // log the result
  // speechRec.start();
}

function startMic() {
  console.log("Speech recognition started"); // log when user clicks
  speechRec.start();
}
