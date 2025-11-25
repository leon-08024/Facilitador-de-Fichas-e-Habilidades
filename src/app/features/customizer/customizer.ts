import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customizer.html',
  styleUrls: ['./customizer.scss']
})
export class CustomizerPageComponent {
  constructor(private router: Router) {}
  finalizarPedidoCustomizer() {
  const selects = document.querySelectorAll('select');
  const quantidade = (document.querySelector('input[type="number"]') as HTMLInputElement)?.value || '1';
  
  const pedido: any = {
    tipo: selects[0].value,
    tempero: selects[1].value,
    molho: selects[2].value,
    estilo: selects[3].value,
    amor: selects[4].value,
    profissao: selects[5].value,
    aleatoria: selects[6].value,
    quantidade: quantidade
  };

  
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  carrinho.push(pedido);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert('Batata adicionada ao carrinho');
   this.router.navigate(['/cart'])
  }
}