import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Ofertas } from '../models/ofertas';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  constructor(private firestore: Firestore) {}

  getOfertas(): Observable<Ofertas[]> {
    const todasOfertas = collection(this.firestore, 'ofertas');
    return collectionData(todasOfertas, { idField: 'id' }) as Observable<
      Ofertas[]
    >;
  }

  getOfertasById(id: string) {
    const oferta = doc(this.firestore, `ofertas/${id}`);
    return docData(oferta, { idField: 'id' }) as Observable<Ofertas>;
  }
}
