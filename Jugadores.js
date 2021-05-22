class Jugador {
  constructor(color) {
    this.color = color;
    this.fichas = [];
  }

  crearFichas() {
    for (let i = 0; i < 4; i++) {
      this.fichas.push(new Ficha(this.color, i, 0));
    }
  }

  asignarPosiciones() {
    for (let ficha of this.fichas) {
      ficha.posX = carcel[this.color][ficha.id][0];
      ficha.posY = carcel[this.color][ficha.id][1];
    }
  }

  numFichasEnCarcel() {
    let cantidad = 0;

    for (let i = 0; i < this.fichas.length; i++) {
      if (this.fichas[i].enCarcel()) {
        cantidad++;
      }
    }
    return cantidad;
  }

  numFichasEnJuego() {
    let cantidad = 0;

    for (let i = 0; i < this.fichas.length; i++) {
      if (this.fichas[i].enJuego) {
        cantidad++;
      }
    }
    return cantidad;
  }

  darColor() {
    switch (this.color) {
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

  decirJugadorInicial() {
    switch (this.color) {
      case 0:
        azulInicia.play();
        break;
      case 1:
        amarilloInicia.play();
        break;
      case 2:
        rojoInicia.play();
        break;
      case 3:
        verdeInicia.play();
        break;
    }
  }

  numFichasEnSalida() {
    let cantidad = 0;

    for (let i = 0; i < this.fichas.length; i++) {
      if (this.fichas[i].enSalida()) {
        cantidad++;
      }
    }
    return cantidad;
  }
}
