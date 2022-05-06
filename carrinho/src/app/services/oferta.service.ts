import { Injectable } from '@angular/core';
import { Ofertas } from '../models/ofertas';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {


public oferta: Ofertas[] = [
  {
    id: 1,
    titulo: "Hamburguer Mineirao",
    descricao: "O melhor hamburguer da casa",
    valor: 300.00,
    imagens: "assets/tenis1.png"
  
 },
  {
    id: 2,
    titulo: "Hamburguer Cariocao",
    descricao: "O melhor hamburguer da casa",
    valor: 200.00,
    imagens:"assets/tenis2.png"
  
 },
  {
    id: 3,
    titulo: "Hamburguer Paulistao",
    descricao: "O melhor hamburguer da casa",
    valor: 400.00,
    imagens: "assets/tenis3.png"
  
   
 }
]

//public getOfertas(): Ofertas[]{
 // return this.oferta
//}

public getOfertas2(): Promise<Ofertas[]>{
  return new Promise((resolve, reject) =>{
   console.log("Voce passou por aqui?")
    resolve(this.oferta)
  })
}


  constructor() {}
  
}
