import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho';

import { Ofertas } from '../models/ofertas';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {


public itens: ItemCarrinho[] = []

public exibirItens(): ItemCarrinho[]{
  return this.itens
}

public incluirItens(oferta: Ofertas): void{

}

  constructor() { }
}
