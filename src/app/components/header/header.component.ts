import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartOpen: boolean = false;

  // Método para abrir o cerrar el carrito
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  // Método para cerrar el carrito
  closeCart() {
    this.cartOpen = false;
  }
}
