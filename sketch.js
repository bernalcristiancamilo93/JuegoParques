let colorBg = 51;
let lang = 'es-CO';
let speechRec;

let aux = false;

let colorCuadrado;

function setup() {

  createCanvas(200, 200);

  speechRec = new p5.SpeechRec(lang, gotSpeech);

  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  rectMode(CENTER);
  colorCuadrado = color(0, 0, 0, 0);

}

function draw() {

  background(colorBg);



  noStroke();
  fill(colorCuadrado);
  rect(width / 2, height / 2, 50, 50);



}

function gotSpeech() {

  if (speechRec.resultValue) {

    console.log(speechRec.resultString);

    switch (speechRec.resultString) {
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
    // if (speechRec.resultString == "amarillo") {
    //   colorCuadrado = (255, )
    // }
  }
}