import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthData } from '../types';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  isAuthenticated = false;
  user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })
    }

    getAuthState(){
      return this.afAuth.authState.pipe(map(authState => authState));
    }

     getIsAuth(): boolean {
      this.afAuth.authState.subscribe(authState => {
        if (authState) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = true;
        }
      })
      return this.isAuthenticated;
    }

    async registerClient(authData: AuthData) {
      await this.afAuth.auth.createUserWithEmailAndPassword(
        authData.email,
        authData.password)
        .then(client => {
          console.log(client);
        });
    }

    login(authData: AuthData) {
      console.log('clicked Login in the authservice')
     return new Promise((resolve, reject) => {
     this.afAuth.auth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(user => resolve(user),
      error => reject(error));
     })
    }

    async logout() {
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      console.log('clicked logout in the service')
    }

}
