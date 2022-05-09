import { Injectable } from '@angular/core';
import { Ofertas } from '../models/ofertas';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {


public itens: Ofertas[] = []

public exbibirItens(): Ofertas[]{
  return this.itens
}

public incluirItem(oferta: Ofertas): void{
  console.log('Oferta recebida no serviço', oferta)


this.itens.push(oferta)

}




  constructor() { }
}
