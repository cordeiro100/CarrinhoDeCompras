import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho';
import { Ofertas } from '../models/ofertas';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {


public itens: Ofertas[] = []

public exibirItens(): Ofertas[]{
  return this.itens
}

public incluirItem(oferta: Ofertas): void{
  console.log('Oferta recebida no serviço', oferta)
  


let itemCarrinhoEncontrado = this.itens.find((oferta: Ofertas) => oferta.id === oferta.id)


  if(itemCarrinhoEncontrado){
    itemCarrinhoEncontrado.quantidade = itemCarrinhoEncontrado.quantidade + 1
  }  else{
    this.itens.push(oferta)
  }
    
  

}


valorTotal(): number{

  let total: number = 0

  this.itens.map((oferta: Ofertas) =>{
    total = total + (oferta.valor * oferta.quantidade)
  })
  return total
}

adicionarQuantidade(oferta: Ofertas): void {

let itemCarrinhoEncontrado = this.itens.find((oferta: Ofertas) => oferta.id === oferta.id)

  if(itemCarrinhoEncontrado){
    itemCarrinhoEncontrado.quantidade += 1
  }
}

subtrairQuantidade(oferta: Ofertas):void{

 let itemCarrinhoEncontrado = this.itens.find((oferta: Ofertas) => oferta.id === oferta.id)
 
 if(itemCarrinhoEncontrado){
   itemCarrinhoEncontrado.quantidade -= 1

   if(itemCarrinhoEncontrado.quantidade === 0) {
     this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
   }
 }

}



  constructor() { }
}
