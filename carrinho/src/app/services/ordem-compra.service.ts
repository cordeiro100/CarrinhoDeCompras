import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Ofertas } from '../models/ofertas';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {



  constructor(private fireStore: Firestore) { }
  
  addPedido(pedidos: Pedido){
    const numeroPedido = collection(this.fireStore, 'pedidos')
    return addDoc(numeroPedido, pedidos)
  }
}
