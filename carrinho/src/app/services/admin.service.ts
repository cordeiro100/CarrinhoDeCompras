import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Ofertas } from '../models/ofertas';
import { Pedido } from '../models/pedido';
Pedido
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: Firestore) { }

getCompra():Observable<Pedido[]>{
  const itemPedido = collection(this.firestore, "pedidos")
  return collectionData(itemPedido, {idField: 'id'}) as Observable<Pedido[]>
}
  
 

}


