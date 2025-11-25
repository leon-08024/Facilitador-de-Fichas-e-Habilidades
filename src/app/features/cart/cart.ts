import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartPageComponent implements OnInit {

  carrinho: any[] = [];
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.carrinho = this.cartService.getItens();
  }

  removerItem(index: number): void {
    this.cartService.remover(index);
    this.carrinho = this.cartService.getItens();
  }

  limparCarrinho(): void {
    this.cartService.limpar();
    this.carrinho = [];
  }

  finalizarCompra(): void {
    this.router.navigate(['/pagamento'])
  }

}