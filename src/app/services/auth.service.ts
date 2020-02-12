import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthData } from '../types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
    }

    registerClient(authData: AuthData) {
      this.afAuth.auth.createUserWithEmailAndPassword(
        authData.email,
        authData.password)
        .then(client => {
          console.log(client);
          this.router.navigate(['/dashboard']);
        });
    }

    login(authData: AuthData) {
      this.afAuth.auth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(client => {
        console.log(client);
        this.router.navigate(['/dashboard']);
      });
    }

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }

}
