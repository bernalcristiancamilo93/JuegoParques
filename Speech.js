let lang = 'es-CO';
let speechRec = new p5.SpeechRec(lang);
var myVoice = new p5.Speech(); // new P5.Speech object
speechRec.continuous = true; // do continuous recognition
speechRec.interimResults = false; // allow partial recognition (faster, less accurate)

function voiceSettings() {
  myVoice.setLang(lang);
  myVoice.setVoice(5);
  myVoice.setPitch(1);

  speechRec.onResult = resultadoDeVoz;
  speechRec.onEnd = conectarMicDeNuevo;

  speechRec.start();
}

function resultadoDeVoz() {

  if (speechRec.resultValue) {

    let resultado = speechRec.resultString;

    console.log("Resultado del SpeechRec: " + resultado);

    // var mostrecentword = resultado.split(' ').pop();
    // console.log(mostrecentword);

    if (resultado.includes("los dados")){
    } else if (resultado.includes("lanzar dados") || resultado.includes("lanzar") || resultado.includes("dados") || resultado.includes("dardos") || resultado.includes("grados") || resultado.includes("lanzamiento de dados") || resultado.includes("lanzamiento dados") || resultado.includes("lanzamiento") || resultado.includes("quitar los estados") || resultado.includes("acertados")) {
    console.log("Lanza los dados");
    lanzamientoRecibido = true;
    loop();
  }

  if (!coloresElejidosPorJugador) {
    if (!confirmacionJugadoresRecibido) {
      if (resultado.includes("entre 2 y 4")) {

      } else if (resultado.includes("dos") || resultado.includes("2") || resultado.includes("tos")) {
        numJugadores = 2;
        myVoice.speak("El número de jugadores es " + numJugadores);
        confirmacionJugadoresRecibido = true;
      } else if (resultado.includes("tres") || resultado.includes("3")) {
        numJugadores = 3;
        myVoice.speak("El número de jugadores es " + numJugadores);
        confirmacionJugadoresRecibido = true;
      } else if (resultado.includes("cuatro") || resultado.includes("4")) {
        numJugadores = 4;
        myVoice.speak("El número de jugadores es " + numJugadores);
        confirmacionJugadoresRecibido = true;
      }
    } else if (confirmacionJugadoresRecibido) {
      if (resultado.includes("amarillo")) {
        jugadores.push(0);
        colorRecibido = true;
      } else if (resultado.includes("verde")) {
        jugadores.push(1);
        colorRecibido = true;
      } else if (resultado.includes("azul")) {
        jugadores.push(2);
        colorRecibido = true;
      } else if (resultado.includes("rojo")) {
        jugadores.push(3);
        colorRecibido = true;
      }
    }



  }
}
}

function dejarMicApagado() {
  console.log("Mic got disconnected...");
}

function conectarMicDeNuevo() {
  console.log("Mic got restarted...");
  speechRec.start();
}