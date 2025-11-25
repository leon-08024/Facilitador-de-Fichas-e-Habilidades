// payment.ts
import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class PaymentPageComponent implements OnInit {
  paymentForm!: FormGroup;
  carrinho: any[] = [];
  total: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.carregarCarrinho();
    this.calcularTotal();
    this.paymentForm = this.fb.group({
      metodoPagamento: ['', Validators.required],
      nomeTitular: [''],
      numeroCartao: [''],
      validade: [''],
      cvv: [''],
      parcelas: [''],
    });
  }

  totalItens(): number {
    return this.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }
  carregarCarrinho(): void {
    this.carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  }

  calcularTotal(): void {
    this.total = this.carrinho.reduce((acc, item) => acc + 15 * item.quantidade, 0);
  }

  voltar(): void {
    this.router.navigate(['/carrinho']);
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const pedido = {
      carrinho: this.carrinho,
      total: this.total,
      pagamento: this.paymentForm.value,
      data: new Date().toISOString(),
    };


    this.http.post('http://localhost:3000/pedidoPago', pedido).subscribe({
      next: () => {
        this.router.navigate(['/thanks'])
        localStorage.removeItem('carrinho');
      },

    });

  }
}
