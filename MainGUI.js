function setup() {
  
  voiceSettings();

  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);



  colorCuadrado = color(0, 0, 0);

  // Create a p5ble class
  console.log("Waiting for connection WebBluetooth...");
  bluetooth = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Conectar');
  connectButton.mousePressed(connectToBle);

  // Create a 'Disconnect' button
  const disconnectButton = createButton('Desconectar');
  disconnectButton.mousePressed(disconnectToBle);

  // Button pos
  let posX = (width - (connectButton.width + disconnectButton.width)) / 2;
  let posY = connectButton.height;

  connectButton.position(posX, posY);
  disconnectButton.position(posX + connectButton.width, posY);
}

function draw() {
  drawScreen();
}
