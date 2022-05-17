import { Injectable } from '@angular/core';

import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

import { UserInfo } from '@angular/fire/auth';

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

  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }

  cadastro(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
}
