import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-rifas';

  numerosRifa: String[] = [];

  constructor(){
    this.generarNumerosRifa();
  }

  generarNumerosRifa() {
    this.numerosRifa = [];
    for (let i = 0; i <= 99999; i++) {
      const numero = ('00000' + i).slice(-5); // Formatea el número para que tenga 5 dígitos
      this.numerosRifa.push(numero);
    }
  }
}
