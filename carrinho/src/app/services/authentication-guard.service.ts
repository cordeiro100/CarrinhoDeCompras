import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  canActivate():boolean{
    return true;
  }
  constructor() { }
}
