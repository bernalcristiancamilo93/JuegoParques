// Número de jugadores
let numJugadores = 0;

// Color para cada jugador
let jugadores = [];
// let jugadores = [0, 2, 3, 1]; // Para cuatro jugs
// let jugadores = [0, 1, 3]; // Para tres jugs
// let jugadores = [0, 2]; // Para dos jugs


// Botón para elección de colores por jugador
let elejirColorJugador;

// Variable para indicar que ya se eligeron los colores
let coloresElejidosPorJugador = false;

// Variable para saber si ya se definió quién va a jugar de primeras.
let turnosDeterminados = false;

// Variable para saber si ya se recibió un lanzamiento
let lanzamientoRecibido = false;

// Variable para saber si ya se hizo un lanzamiento
let lanzamientoHecho = false;

// Guarda lo que el jugador sacó en la rutina de determinación de turnos
let cantidadTotal = [];

// Guarda lo que hay en los dados
let valorDados = [];

// Contador de defición de turnos
let jugadorActual = 0;

// Indica si puede mostrar el último resultado de los dados.
let mostrarDadosEnPantalla = false;

// Verifica que se le haya enviado el número de jugadores
let confirmacionJugadoresRecibido = false;

// Verifica que haya pedido el número de jugadores
let dichoPedirJugs = false;

// Verifica que el primer color se haya dicho
dichoPrimerColor = false;

// Verifica que se haya recibido un color
colorRecibido = false;


// Main Program

function setup() {
  createCanvas(windowWidth, 400);

  voiceSettings();
  crearElementos();
}

function draw() {

  background(220);

  // Flujo del juego
  if (!coloresElejidosPorJugador) {
    // elejirColorJugador.show();
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    fill(0);
    text('ELECCIÓN DE COLORES', width / 2, 100);

    if (!confirmacionJugadoresRecibido && !dichoPedirJugs) {
      myVoice.speak("Diga el número de participantes que hay en el juego. Este tiene que ser un valor entre 2 y 4");
      dichoPedirJugs = true;
    }

    if (numJugadores == 2 && confirmacionJugadoresRecibido && !dichoPrimerColor) {
      myVoice.speak("Algún jugador diga el color con el que va a jugar");

      dichoPrimerColor = true;
    }

    if (numJugadores == 2 && colorRecibido && dichoPrimerColor) {

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

      myVoice.speak("Como solo hay dos jugadores, al otro jugador se le asignó el color opuesto que es el " + darColor(jugadores[1]) + ". Ahora vamos a ver a quién le toca el primer turno");

      colorRecibido = false;
      coloresElejidosPorJugador = true;
    }

    if (numJugadores == 3 && confirmacionJugadoresRecibido && !dichoPrimerColor) {
      myVoice.speak("Algún jugador diga el color que no va a jugar");
      dichoPrimerColor = true;
    }

    if (numJugadores == 3 && colorRecibido && dichoPrimerColor) {

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

      myVoice.speak("Los colores con los que vamos a jugar son el " + darColor(jugadores[0]) + ", el " + darColor(jugadores[1]) + " y el " + darColor(jugadores[2]) + ". Ahora vamos a ver a quién le toca el primer turno");

      colorRecibido = false;
      coloresElejidosPorJugador = false;
    }

    if (numJugadores == 4 && confirmacionJugadoresRecibido && !dichoPrimerColor) {

      jugadores.push(0);
      jugadores.push(1);
      jugadores.push(2);
      jugadores.push(3);

      coloresElejidosPorJugador = true;
      colorRecibido = false;
      dichoPrimerColor = true;
      // myVoice.speak("Ahora vamos a ver a quién le toca el primer turno");
    }

  } else if (!turnosDeterminados) {

    totalParticipantes = jugadores.length;

    if (jugadorActual < totalParticipantes) {

      if (!lanzamientoRecibido) {
        myVoice.speak("Que el " + darColor(jugadores[jugadorActual]) + " lanze los dados");
        console.log("entra");
      }

      lanzamientoDeDados();

      if (lanzamientoHecho) {
        cantidadTotal.push(valorDados[0] + valorDados[1]);
        myVoice.speak("El jugador " + darColor(jugadores[jugadorActual]) + " sacó un total de " + (valorDados[0] + valorDados[1]));
        jugadorActual++;
        lanzamientoHecho = false;
        mostrarDadosEnPantalla = true;
      }
    } else {
      let primerTurno = cantidadTotal.indexOf(Math.max(...cantidadTotal));
    }

    // var newLength = myArray.unshift(myArray[20])
    // newLength = myArray.pop()
  }

  if (mostrarDadosEnPantalla) {
    textAlign(CENTER, CENTER);
    textSize(72);
    fill(0);
    text(valorDados[0], width / 2 - 50, height / 2);
    text(valorDados[1], width / 2 + 50, height / 2);
  }
   textAlign(CENTER, CENTER);
    textSize(72);
    fill(0);
    text(windowWidth, width / 2 - 50, height / 2);
    text(windowHeight, width / 2 + 50, height / 2);
}

function lanzamientoDeDados() {

  if (lanzamientoRecibido) {

    valorDados[0] = floor(random(1, 7));
    valorDados[1] = floor(random(1, 7));

    console.log("Números de los dados: " + valorDados[0] + " y " + valorDados[1]);

    // Hace que en la determinación de turno no se repitan los resultados.
    if (!turnosDeterminados) {
      for (let i = 0; i < cantidadTotal.length; i++) {
        if ((cantidadTotal[i] == (valorDados[0] + valorDados[1]))) {
          lanzamientoDeDados();
        }
      }
    }



    lanzamientoRecibido = false;
    lanzamientoHecho = true;
  } else {
    noLoop();
  }







}

function crearElementos() {

  // Botón para elección de colores por jugador
  elejirColorJugador = createButton('Elegir colores');
  elejirColorJugador.mousePressed(elegirJugadoresCambioEstado);
  elejirColorJugador.hide();

  // Creación de elementos para seleción de colores y jugadores
  // selectJ();

}

function elegirJugadoresCambioEstado() {
  coloresElejidosPorJugador = true;
  elejirColorJugador.hide();
  console.log("Cada jugador ha escogido su color");

  // Para saber qué color escogió cada jugador
  for (let i = 0; i < jugadores.length; i++) {


    console.log("Jugador " + (i + 1) + " " + darColor(jugadores[i]));
  }
}

function darColor(dato) {
  switch (dato) {
    case 0:
      return "amarillo";
    case 1:
      return "verde";
    case 2:
      return "azul";
    case 3:
      return "rojo";
  }
}
