import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartOpen: boolean = false;


    constructor(
        private router: Router,
      ){

      }


  // Método para abrir o cerrar el carrito
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  // Método para cerrar el carrito
  closeCart() {
    this.cartOpen = false;
  }


  goToHome() {
    this.router.navigate(['/']);
  }

}
