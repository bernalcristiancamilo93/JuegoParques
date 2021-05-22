// Audio de bienvenida
let bienvenida;

// Audio número de participantes
let numParticipantes;

function preloadSonidos() {
  bienvenida = loadSound("Media/Audio/1. Intro.mp3");
}

function loadSonidos() {
  numParticipantes = loadSound("Media/Audio/2. Número de players.m4a");
  respuestaEquivocada = loadSound("Media/Audio/14. Repite lo que dijiste.m4a");
  colorNoUsado = loadSound("Media/Audio/4. Color que NO se usará.m4a");
  colorUsado = loadSound("Media/Audio/3. Selección color.m4a");
  primerTurno = loadSound("Media/Audio/5. Primer Turno 2.m4a");
  turnoAmarillo = loadSound("Media/Audio/6. Yellow Player .m4a");
  turnoAzul = loadSound("Media/Audio/7. Blue Player.m4a");
  turnoVerde = loadSound("Media/Audio/9. Green Player.m4a");
  turnoRojo = loadSound("Media/Audio/8. Red Player.m4a");
  amarilloInicia = loadSound("Media/Audio/10. Amarillo inicia.m4a");
  azulInicia = loadSound("Media/Audio/11. Azul inicia.m4a");
  verdeInicia = loadSound("Media/Audio/13. Verde inicia.m4a");
  rojoInicia = loadSound("Media/Audio/12. Rojo inicia.m4a");
  movimientoInvalido = loadSound("Media/Audio/15. Movimiento Inválido.m4a");
  moverFicha = loadSound("Media/Audio/16. ¿Qué ficha mover_.m4a");
  numCasillas = loadSound("Media/Audio/17. # de Casillas.m4a");
}

function sonidosSettings() {
  bienvenida.onended(aumentarEstadoColores);
  primerTurno.onended(aumentarEstadoTurnos);
  moverFicha.onended(aumentarContadorListaMovimientos);
  movimientoInvalido.onended(aumentarContadorListaMovimientos);
  numCasillas.onended(aumentarContadorListaMovimientos);
}

function aumentarEstadoColores() {
  estadoColores++;
}

function aumentarEstadoTurnos() {
  estadoTurnos++;
}

function aumentarContadorListaMovimientos() {
  contadorListaMovimientos++;
}
