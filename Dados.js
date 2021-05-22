// Guarda lo que hay en los dados
let valorDados = [];

// Guarda lo que el jugador sacó en la rutina de determinación de turnos
let cantidadTotal = [];

// La posibilidad de lanzar los dados está abierta
let dadosEnabled = false;

// Indica que se recibió un lanzamiento de los dados
let lanzamientoRecibido = false;

// Indica si puede mostrar el último resultado de los dados.
let mostrarDadosEnPantalla = false;

// Variable para saber si ya se hizo un lanzamiento
let lanzamientoHecho = false;

// Variable para saber si se usa la lista de movimientos
let utilizarListaMovimientos = false;

// Longitud del lado del dado
let lado = 340;

// Contador lista movimientos
let contadorListaMovimientos = 0;

// Lanzamientos pre-programados
let listaLanzamientos = [
  [2, 1],
  [3, 4],
  [6, 4],
  [2, 1],
  [3, 3],
  [3, 2],
  [1, 4],
  [3, 1],
  [1, 1],
  [6, 2],
  [6, 2],
  [6, 2],
  [6, 2],
  [2, 2],
  [4, 3],
  [4, 3],
  [4, 3],
  [4, 3],
  [4, 3],
  [2, 2],
  [1, 4],
  [1, 4],
  [1, 4],
  [1, 4],
  [1, 4],
];

function mostrarMovimientoDados() {}

function lanzamientoDeDados() {
  if (lanzamientoRecibido) {
    valorDados[0] = floor(random(1, 7));
    valorDados[1] = floor(random(1, 7));

    // Hace que en la determinación de turno no se repitan los resultados.
    if (estadoGeneral == 1) {
      for (let i = 0; i < cantidadTotal.length; i++) {
        if (cantidadTotal[i] == valorDados[0] + valorDados[1]) {
          lanzamientoDeDados();
        }
      }
    }

    // Hay 75% de probabilidad de sacar un par de una si alguien está en la cárcel
    // if (estadoGeneral == 2) {
    //   if (
    //     jugadoresObjetos[turno].numFichasEnCarcel() != 0 &&
    //     estadoSalidaDelaCarcel == 1
    //   ) {
    //     if (random() < 0.75) {
    //       valorDados[1] = valorDados[0];
    //     }
    //   }
    // }

    if (
      utilizarListaMovimientos &&
      contadorListaMovimientos < listaLanzamientos.length
    ) {
      valorDados[0] = listaLanzamientos[contadorListaMovimientos][0];
      valorDados[1] = listaLanzamientos[contadorListaMovimientos][1];
      contadorListaMovimientos++;
    }

    console.log(
      "Números de los dados: " + valorDados[0] + " y " + valorDados[1]
    );

    lanzamientoRecibido = false;
    lanzamientoHecho = true;
    dadosEnabled = false;
  } else {
    dadosEnabled = true;
  }
}

function dadoBase() {
  push();
  noStroke();
  fill("#FEFDEB");
  rect(0, 0, lado / 2, lado, lado / 10, 0, 0, lado / 10);
  translate(lado / 2, 0);
  fill("#E4DDC7");
  rect(0, 0, lado / 2, lado, 0, lado / 10, lado / 10, 0);
  pop();
}

function puntoPartido() {
  let size = lado / 5;

  push();
  noStroke();
  fill("#3F3B3E");
  arc(0, 0, size, size, -HALF_PI, HALF_PI);
  fill("#55504F");
  arc(0, 0, size, size, HALF_PI, -HALF_PI);
  pop();
}

function puntoClaro() {
  let size = lado / 5;

  push();
  noStroke();
  fill("#55504F");
  ellipse(0, 0, size, size);
  pop();
}

function puntoOscuro() {
  let size = lado / 5;

  push();
  noStroke();
  fill("#3F3B3E");
  ellipse(0, 0, size, size);
  pop();
}

function dado1() {
  dadoBase();
  push();
  translate(lado / 2, lado / 2);
  puntoPartido();
  pop();
}

function dado2() {
  let espacio = (lado - (3 * lado) / 5) / 4;
  dadoBase();
  push();
  translate(espacio + lado / 10, espacio + lado / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 2 * espacio + (4 * lado) / 10);
  puntoOscuro();
  pop();
}

function dado3() {
  let espacio = (lado - (3 * lado) / 5) / 4;
  dadoBase();
  push();
  translate(espacio + lado / 10, espacio + lado / 10);
  puntoClaro();
  translate(espacio + (2 * lado) / 10, espacio + (2 * lado) / 10);
  puntoPartido();
  translate(espacio + (2 * lado) / 10, espacio + (2 * lado) / 10);
  puntoOscuro();
  pop();
}

function dado4() {
  let espacio = (lado - (3 * lado) / 5) / 4;
  dadoBase();
  push();
  translate(espacio + lado / 10, espacio + lado / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 0);
  puntoOscuro();
  translate(0, 2 * espacio + (4 * lado) / 10);
  puntoOscuro();
  translate(-2 * espacio - (4 * lado) / 10, 0);
  puntoClaro();
  pop();
}

function dado5() {
  let espacio = (lado - (3 * lado) / 5) / 4;
  dadoBase();
  push();
  translate(espacio + lado / 10, espacio + lado / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 0);
  puntoOscuro();
  translate(-espacio - (2 * lado) / 10, espacio + (2 * lado) / 10);
  puntoPartido();
  translate(-espacio - (2 * lado) / 10, espacio + (2 * lado) / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 0);
  puntoOscuro();
  pop();
}

function dado6() {
  let espacio = (lado - (3 * lado) / 5) / 4;
  dadoBase();
  push();
  translate(espacio + lado / 10, espacio + lado / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 0);
  puntoOscuro();
  translate(0, espacio + (2 * lado) / 10);
  puntoOscuro();
  translate(-2 * espacio - (4 * lado) / 10, 0);
  puntoClaro();
  translate(0, espacio + (2 * lado) / 10);
  puntoClaro();
  translate(2 * espacio + (4 * lado) / 10, 0);
  puntoOscuro();
  pop();
}
