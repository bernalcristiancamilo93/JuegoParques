// Número de jugadores
let numJugadores = 0;

// Orden y color para cada jugador
let jugadores = [];

// Lista de colores
let colores = ["azul", "amarillo", "rojo", "verde"];

// Arreglo de objetos de jugadores
let jugadoresObjetos = [];

// Estado general del juego
let estadoGeneral = 0;

// Estado de elección de colores
let estadoColores = 0;

// Indica que ya se dijo el número de jugs que van a participar
let numJugadoresRecibido = false;

// Indica que ya se dijo el primer color
let primerColorRecibido = false;

// Contador de defición de turnos
let jugadorActual = 0;

// Estado de selección de turnos
let estadoTurnos = 0;

// Indica que ya se dijo la frase de primer turno
let frasePrimerTurno = false;

// Estado del juego
let estadoJuego = 0;

function preload() {
  preloadSonidos();
  preloadImages();
}

function setup() {
  loadSonidos();
  drawSettings();
  bluetoothSettings();
  sonidosSettings();
}

function draw() {
  drawScreen();

  if (mostrarDadosEnPantalla) {
    push();
    translate(100, 732);
    switch (valorDados[0]) {
      case 1:
        dado1();
        break;
      case 2:
        dado2();
        break;
      case 3:
        dado3();
        break;
      case 4:
        dado4();
        break;
      case 5:
        dado5();
        break;
      case 6:
        dado6();
        break;
    }
    translate(440, 0);
    switch (valorDados[1]) {
      case 1:
        dado1();
        break;
      case 2:
        dado2();
        break;
      case 3:
        dado3();
        break;
      case 4:
        dado4();
        break;
      case 5:
        dado5();
        break;
      case 6:
        dado6();
        break;
    }
    pop();
  }
}

function preloadImages() {
  sinConectarIMG = createImg("Media/Images/Antes de conexión.png", "");
  jugadoresYColores = createImg(
    "Media/Images/Elección colores y jugadores.png",
    ""
  );
  primerTurnoAzul = createImg("Media/Images/1Turno Azul.png", "");
  primerTurnoAmarillo = createImg("Media/Images/1Turno Amarillo.png", "");
  primerTurnoRojo = createImg("Media/Images/1Turno Rojo.png", "");
  primerTurnoVerde = createImg("Media/Images/1Turno Verde.png", "");
  turnoAzulIMG = createImg("Media/Images/Juego Azul.png", "");
  turnoAmarilloIMG = createImg("Media/Images/Juego Amarillo.png", "");
  turnoRojoIMG = createImg("Media/Images/Juego Rojo.png", "");
  turnoVerdeIMG = createImg("Media/Images/Juego Verde.png", "");
}

function drawSettings() {
  createCanvas(980, 1804);

  sinConectarIMG.position(0, 0);
  sinConectarIMG.hide();
  jugadoresYColores.position(0, 0);
  jugadoresYColores.hide();
  primerTurnoAzul.position(0, 0);
  primerTurnoAzul.hide();
  primerTurnoAmarillo.position(0, 0);
  primerTurnoAmarillo.hide();
  primerTurnoRojo.position(0, 0);
  primerTurnoRojo.hide();
  primerTurnoVerde.position(0, 0);
  primerTurnoVerde.hide();
  turnoAzulIMG.position(0, 0);
  turnoAzulIMG.hide();
  turnoAmarilloIMG.position(0, 0);
  turnoAmarilloIMG.hide();
  turnoRojoIMG.position(0, 0);
  turnoRojoIMG.hide();
  turnoVerdeIMG.position(0, 0);
  turnoVerdeIMG.hide();
}

function drawScreen() {
  if (isConnected) {
    switch (estadoGeneral) {
      case 0:
        elegirColoresYJugadores();
        break;
      case 1:
        determinarPrimerTurno();
        break;
      case 2:
        juego();
        break;
    }
  } else {
    image(sinConectarIMG, 0, 0);
  }

  text(receivedValue, width / 2, height / 2 + 75);
}

function juego() {
  if (
    utilizarListaMovimientos &&
    contadorListaMovimientos < listaLanzamientos.length
  ) {
    switch (estadoJuego) {
      case 0:
        switch (contadorListaMovimientos) {
          case 3:
            image(turnoRojoIMG, 0, 0);
            estadoJuego++;
            break;
          case 4:
            image(turnoRojoIMG, 0, 0);
            turnoRojo.play();
            estadoJuego++;
            break;
          case 5:
            image(turnoAzulIMG, 0, 0);
            turnoAzul.play();
            sendData("SaleRojo\n");
            estadoJuego++;
            break;
          case 6:
            image(turnoAzulIMG, 0, 0);
            turnoAzul.play();
            estadoJuego++;
            break;
          case 7:
            image(turnoAzulIMG, 0, 0);
            turnoAzul.play();
            estadoJuego++;
            break;
          case 8:
            image(turnoAmarilloIMG, 0, 0);
            turnoAmarillo.play();
            estadoJuego++;
            break;
          case 9:
            image(turnoRojoIMG, 0, 0);
            turnoRojo.play();
            sendData("SaleAmarillo");
            estadoJuego++;
            break;
          case 10:
            image(turnoAzulIMG, 0, 0);
            turnoAzul.play();
            sendData("RojoMueveSeis");
            estadoJuego++;
            break;
          case 11:
            image(turnoAmarilloIMG, 0, 0);
            turnoAmarillo.play();
            sendData();
            estadoJuego++;
            break;
          case 12:
            image(turnoAmarilloIMG, 0, 0);
            turnoAmarillo.play();
            sendData();
            estadoJuego++;
            break;
          case 13:
            image(turnoRojoIMG, 0, 0);
            turnoRojo.play();
            sendData();
            estadoJuego++;
            break;
        }
        break;
      case 1:
        lanzamientoDeDados();
        if (lanzamientoHecho) {
          estadoJuego = 0;
          lanzamientoHecho = false;
          mostrarDadosEnPantalla = true;
        }
        break;
    }
  }
}

function elegirColoresYJugadores() {
  // jugadoresYColores.show();
  image(jugadoresYColores, 0, 0);
  switch (estadoColores) {
    case 1:
      numParticipantes.play();
      estadoColores++;
      break;
    case 2:
      if (numJugadoresRecibido) {
        if (numJugadores == 2) {
          colorUsado.play();
          estadoColores++;
        } else if (numJugadores == 3) {
          colorNoUsado.play();
          estadoColores++;
        } else if (numJugadores == 4) {
          estadoColores++;
        }
      }
      break;
    case 3:
      if (primerColorRecibido) {
        if (numJugadores == 2) {
          let color = jugadores[0];

          if (color == 0) {
            jugadores.push(2);
          } else if (color == 1) {
            jugadores.push(3);
          } else if (color == 2) {
            jugadores.push(0);
          } else if (color == 3) {
            jugadores.push(1);
          }
          primerTurno.play();
          estadoGeneral++;
        } else if (numJugadores == 3) {
          let color = jugadores[0];

          if (color == 0) {
            jugadores.push(1);
            jugadores.push(2);
            jugadores.push(3);
          } else if (color == 1) {
            jugadores.push(0);
            jugadores.push(2);
            jugadores.push(3);
          } else if (color == 2) {
            jugadores.push(0);
            jugadores.push(1);
            jugadores.push(3);
          } else if (color == 3) {
            jugadores.push(0);
            jugadores.push(1);
            jugadores.push(2);
          }
          jugadores.shift();
          primerTurno.play();
          estadoGeneral++;
        }
      }
      if (numJugadores == 4) {
        jugadores.push(0);
        jugadores.push(1);
        jugadores.push(2);
        jugadores.push(3);
        estadoGeneral++;
      }
      break;
  }
}

function determinarPrimerTurno() {
  if (jugadorActual < numJugadores) {
    switch (estadoTurnos) {
      case 1:
        switch (jugadores[jugadorActual]) {
          case 0:
            turnoAzul.play();
            image(primerTurnoAzul, 0, 0);
            estadoTurnos++;
            break;
          case 1:
            turnoAmarillo.play();
            image(primerTurnoAmarillo, 0, 0);
            estadoTurnos++;
            break;
          case 2:
            turnoRojo.play();
            image(primerTurnoRojo, 0, 0);
            estadoTurnos++;
            break;
          case 3:
            turnoVerde.play();
            image(primerTurnoVerde, 0, 0);
            estadoTurnos++;
            break;
        }
        break;

      case 2:
        lanzamientoDeDados();
        if (lanzamientoHecho) {
          cantidadTotal.push(valorDados[0] + valorDados[1]);
          console.log(
            "El jugador " +
              darColor(jugadores[jugadorActual]) +
              " sacó un total de " +
              (valorDados[0] + valorDados[1])
          );
          jugadorActual++;
          estadoTurnos = 1;
          lanzamientoHecho = false;
          mostrarDadosEnPantalla = true;
        }
    }
  } else {
    let primerTurno = cantidadTotal.indexOf(Math.max(...cantidadTotal));

    for (let i = 0; i < primerTurno; i++) {
      let valor = jugadores.shift();
      jugadores.push(valor);
    }
    crearLosJugadores();

    jugadoresObjetos[0].decirJugadorInicial();

    // mostrarDadosEnPantalla = false;
    estadoGeneral++;
  }
}

function crearLosJugadores() {
  for (let jug of jugadores) {
    jugadoresObjetos.push(new Jugador(jug));
  }

  for (let jug of jugadoresObjetos) {
    jug.crearFichas();
    jug.asignarPosiciones();
    // print(jug);
  }
}

function mousePressed() {
  if (
    mouseX > 230 &&
    mouseX < 748 &&
    mouseY > 1371 &&
    mouseY < 1486 &&
    !isConnected
  ) {
    connectToBle();
  }

  if (
    mouseX > 548 &&
    mouseX < 916 &&
    mouseY > 1639 &&
    mouseY < 1719 &&
    isConnected
  ) {
    image(sinConectarIMG, 0, 0);
    speechRec.onEnd = dejarMicApagado;
    disconnectToBle();
  }

  if (isConnected) {
    // sendData("Test\n");
  }

  // prevent default
  return false;
}

function darColor(dato) {
  switch (dato) {
    case 0:
      return colores[0];
    case 1:
      return colores[1];
    case 2:
      return colores[2];
    case 3:
      return colores[3];
  }
}
