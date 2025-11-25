import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  const contador = document.getElementById('cart-count');
  if (contador) contador.textContent = carrinho.length.toString();
}
}