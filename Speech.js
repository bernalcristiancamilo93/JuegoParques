let lang = 'es-CO';
let speechRec = new p5.SpeechRec(lang);
var myVoice = new p5.Speech(); // new P5.Speech object
speechRec.continuous = true; // do continuous recognition
speechRec.interimResults = false; // allow partial recognition (faster, less accurate)


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

function onEndResultConectado() {
  console.log("Mic got restarted...");
  speechRec.start();
}

function onEndResultDesconectado() {
  console.log("Mic got disconnected...");
}

function voiceSettings() {
  myVoice.setLang(lang);
  myVoice.setVoice(5);
  myVoice.setPitch(1);
}

function audioBluetooth() {

  if (isConnected) {
    myVoice.speak("Buenos días, amiguitos. ¿Cómo están? Hoy vamos a jugar parqués.");
    speechRec.onResult = showResult; // bind callback function to trigger when speech is recognized
    speechRec.onEnd = onEndResultConectado;
    speechRec.start();
  } else {
    myVoice.speak("Chao, gente. Se me cuidan y que Dios los bendiga.");
    speechRec.onEnd = onEndResultDesconectado;
  }

}
