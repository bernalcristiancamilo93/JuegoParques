let bluetooth;
let isConnected = false;
let bluetoothCharacteristic;
let receivedValue = "";
let ack = false;


function bluetoothSettings() {
  // Create a p5ble class
  console.log("Waiting for connection WebBluetooth...");
  bluetooth = new p5ble();
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  bluetooth.connect(0xFFE0, gotCharacteristics);
}

function disconnectToBle() {
  // Disonnect to the device
  bluetooth.disconnect();
  // Check if myBLE is connected
  isConnected = bluetooth.isConnected();
}

function onDisconnected() {
  console.log('Device got disconnected');
  isConnected = false;

  audioBluetooth();
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('Error: ', error);
  console.log('Characteristics: ', characteristics);

  // Check if myBLE is connected
  isConnected = bluetooth.isConnected();

  if (isConnected) audioBluetooth();

  // Add a event handler when the device is disconnected
  bluetooth.onDisconnected(onDisconnected);

  bluetoothCharacteristic = characteristics[0];

  bluetooth.startNotifications(bluetoothCharacteristic, gotValue, 'string');
}

function sendData(command) {
  const inputValue = command;
  if (!("TextEncoder" in window)) {
    console.log("Sorry, this browser does not support TextEncoder...");
  }
  
  var enc = new TextEncoder(); // always utf-8
  bluetoothCharacteristic.writeValue(enc.encode(inputValue));
  console.log(inputValue);
}

function gotValue(value) {
  console.log('value: ', value);
  receivedValue = value;
  ack = true;
}