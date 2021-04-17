let bluetooth;
let isConnected = false;
// let blueToothCcteristic;
// let receivedValue = "";
// var millisecondTimerStart;
// var oldColorPickerValue;

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
  if (error) {
    console.log('Error: ', error);
  }
  console.log('Characteristics: ', characteristics);

  // Check if myBLE is connected
  isConnected = bluetooth.isConnected();

  // Add a event handler when the device is disconnected
  bluetooth.onDisconnected(onDisconnected);

  if (isConnected) {
    audioBluetooth();
  }

}

function sendData(command) {
  const inputValue = command;
  if (!("TextEncoder" in window)) {
    console.log("Sorry, this browser does not support TextEncoder...");
  }
  var enc = new TextEncoder(); // always utf-8
  blueToothCharacteristic.writeValue(enc.encode(inputValue));
}
