function drawScreen() {
  textSize(18);
  textStyle(BOLD);

  if (isConnected) {
    background(0, 255, 0);
    fill(0);
    text('LISTO PARA JUGAR', width / 2, 80);
  } else {
    background(51);
    textAlign(CENTER, TOP);
    fill(255);
    text('DESCONECTADO', width / 2, 80);
  }
}