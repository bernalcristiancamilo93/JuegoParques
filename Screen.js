let colorCuadrado;

function drawScreen() {

  textSize(38);
  textStyle(BOLD);
  textAlign(CENTER, TOP);

  if (isConnected) {
    background(30, 255, 30);
    fill(0);
    text('LISTO PARA JUGAR', width / 2, 100);
  } else {
    background(51);
    fill(255);
    text('DESCONECTADO', width / 2, 100);
  }

  noStroke();
  fill(colorCuadrado);
  rect(width / 2, height / 2, 50, 50);
}
