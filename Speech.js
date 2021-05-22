let lang = "es-CO";
let speechRec = new p5.SpeechRec(lang);
speechRec.continuous = true; // do continuous recognition
speechRec.interimResults = false; // allow partial recognition (faster, less accurate)

function resultadoDeVoz() {
  if (speechRec.resultValue) {
    let resultado = speechRec.resultString;
    console.log("Resultado del SpeechRec: " + resultado);

    if (estadoGeneral == 0) {
      let valido;

      switch (estadoColores) {
        case 2:
          valido = false;

          if (
            resultado.includes("dijiste") ||
            resultado.includes("jugaremos") ||
            resultado.includes("jugar")
          ) {
          } else if (resultado.includes("tres jugadores")) {
            numJugadores = 3;
            utilizarListaMovimientos = true;
            print("Se usa la lista de movimientos");
            valido = true;
          } else if (
            resultado.includes("dos") ||
            resultado.includes("2") ||
            resultado.includes("tos") ||
            resultado.includes("los") ||
            resultado.includes("las")
          ) {
            numJugadores = 2;
            valido = true;
          } else if (resultado.includes("tres") || resultado.includes("3")) {
            numJugadores = 3;
            valido = true;
          } else if (resultado.includes("cuatro") || resultado.includes("4")) {
            numJugadores = 4;
            valido = true;
          } else if (!numJugadoresRecibido) {
            respuestaEquivocada.play();
          }

          if (valido) {
            if (numJugadores == 4) {
              primerTurno.play();
            }
            numJugadoresRecibido = true;
          }
          break;
        case 3:
          valido = false;

          if (resultado.includes("dijiste") || resultado.includes("usar")) {
          } else if (
            resultado.includes("amarillo") ||
            resultado.includes("amarilla")
          ) {
            jugadores.push(1);
            valido = true;
          } else if (resultado.includes("verde")) {
            jugadores.push(3);
            valido = true;
          } else if (resultado.includes("azul")) {
            jugadores.push(0);
            valido = true;
          } else if (resultado.includes("rojo")) {
            jugadores.push(2);
            valido = true;
          } else if (!primerColorRecibido) {
            respuestaEquivocada.play();
          }

          if (valido) {
            primerColorRecibido = true;
          }
          break;
      }
    }

    if (dadosEnabled) {
      if (
        resultado.includes("dijiste") ||
        resultado.includes("jugador") ||
        resultado.includes("turno") ||
        resultado.includes("usar")
      ) {
      } else if (
        resultado.includes("lanzar dados") ||
        resultado.includes("lanzamiento") ||
        resultado.includes("datos") ||
        resultado.includes("lanzar los dados") ||
        resultado.includes("lanzar") ||
        resultado.includes("dados") ||
        resultado.includes("estados") ||
        resultado.includes("dardos") ||
        resultado.includes("grados") ||
        resultado.includes("quitar los estados") ||
        resultado.includes("acertados") ||
        resultado.includes("k2") ||
        resultado.includes("dos") ||
        resultado.includes("todos") ||
        resultado.includes("Dallas") ||
        resultado.includes("dado") ||
        resultado.includes("estados") ||
        resultado.includes("thanos") ||
        resultado.includes("aros") ||
        resultado.includes("Dance") ||
        resultado.includes("talos")
      ) {
        console.log("Lanza los dados");
        lanzamientoRecibido = true;
      } else if (!lanzamientoRecibido) {
        respuestaEquivocada.play();
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

function audioBluetooth() {
  if (isConnected) {
    sinConectarIMG.hide();
    bienvenida.play();
    speechRec.onResult = resultadoDeVoz; // bind callback function to trigger when speech is recognized
    speechRec.onEnd = conectarMicDeNuevo;
    speechRec.start();
  } else {
    // myVoice.speak("Chao");
    speechRec.onEnd = conectarMicDeNuevo;
  }
}
