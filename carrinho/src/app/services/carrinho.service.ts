import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho';
import { Ofertas } from '../models/ofertas';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  public itens: Ofertas[] = [];

  public totalItensObservable = new BehaviorSubject<number>(0);

  constructor() {}

  public exibirItens(): Ofertas[] {
    return this.itens;
  }

  public incluirItem(oferta: Ofertas): void {
    console.log('Oferta recebida no serviço', oferta);

    let itemCarrinhoEncontrado = this.itens.find(
      (item: Ofertas) => item.id === oferta.id
    );

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade = itemCarrinhoEncontrado.quantidade + 1;
    } else {
      this.itens.push(oferta);
    }
    console.log("carrinho service")
    this.totalItensObservable.next(this.totalItensObservable.getValue() + 1);
  }

  valorTotal(): number {
    let total: number = 0;

    this.itens.map((oferta: Ofertas) => {
      total = total + oferta.valor * oferta.quantidade;
    });
    return total;
  }

  adicionarQuantidade(oferta: Ofertas): void {
    let itemCarrinhoEncontrado = this.itens.find(
      (item: Ofertas) => item.id === oferta.id
    );

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
      this.totalItensObservable.next(this.totalItensObservable.getValue() + 1);
    }
  }

  subtrairQuantidade(oferta: Ofertas): void {
    let itemCarrinhoEncontrado = this.itens.find(
      (item: Ofertas) => item.id === oferta.id
    );

    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1;

      if (itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
      }
      this.totalItensObservable.next(this.totalItensObservable.getValue() - 1);
    }
  }

  limparCarrinho(): void {
    this.itens = [];
    this.totalItensObservable.next(0)
  }

  getTotalItens() {
    return this.totalItensObservable.asObservable();
  }
}
