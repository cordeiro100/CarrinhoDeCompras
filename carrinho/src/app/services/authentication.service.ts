import { Injectable } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { User } from '../models/user';
import * as firebase from '@angular/fire';
import { Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public token_id: string;

  currentUser$ = authState(this.auth);

  user$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  cadastro(nome: string, sobrenome: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: nome })));
  }
}
