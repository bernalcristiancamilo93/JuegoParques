// Selector de los jugadores
let sel;

// Variables de los jugadores
let Gamers, G1, G2, G3, G4, ContG=0;

// Variables tipo checkbox
let ColRed, ColBlue, ColGreen, ColYellow;

// Vector para guardar colores elegidos
let Mcj=["Color1","Color2","Color3","Color4"];

function selectJ() {
  
  textAlign(CENTER);
  sel = createSelect();
  sel.position(width/2 ,80);
  sel.option('');
  sel.option('2 jugadores');
  sel.option('3 jugadores');
  sel.option('4 jugadores');
  
  ColYellow = createCheckbox('Amarillo', false);
  ColYellow.position(width/4,height/3.5);
  ColRed    = createCheckbox('Rojo', false);
  ColRed.position(width/1.9+5,height/3.5);
  ColBlue   = createCheckbox('Azul', false);
  ColBlue.position(width/2.5+10,height/3.5);
  ColGreen  = createCheckbox('Verde', false);
  ColGreen.position(width/1.6+10,height/3.5); 
}