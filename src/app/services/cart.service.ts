import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'carrinho';

  getItens(): any[] {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  }

  salvar(itens: any[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(itens));
  }

  adicionar(item: any): void {
    const itens = this.getItens();
    itens.push(item);
    this.salvar(itens);
  }

  remover(index: number): void {
    const itens = this.getItens();
    itens.splice(index, 1);
    this.salvar(itens);
  }

  limpar(): void {
    localStorage.removeItem(this.KEY);
  }
}