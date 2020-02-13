import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {
    isAuthenticated = false;


    constructor(
        private authService: AuthService,
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        // let url: string = state.url;


        // return this.checkLogin(url);
        return this.afAuth.authState.pipe(map(auth => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }))
        
    }

    canLoad(route: Route): boolean{

        let user = localStorage.getItem('user');

        if (user) { return true; }

        this.router.navigate(['/login']);
        return false;
        // return this.afAuth.authState.pipe(map(auth => {
        //     if (!auth) {
        //         this.router.navigate(['/login']);
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }))
        // let url: string = `/${route.path}`;


        // return this.checkLogin(url);
    }

    // checkLogin(url: string): boolean {
    //     this.afAuth.authState.pipe(map(authState => {
    //         console.log(JSON.stringify(authState))
    //         if (authState) { return true; }
    //         return true;
    //     }))
    //     // this.authService.getAuthState().subscribe(
    //     //     authState => {
    //     //         if (authState) { return true;}
    //     //     }
    //     // )

    //     // if (this.authService.getIsAuth()) {return true;}

    //     // // Store the attempted URL for redirecting
    //     // this.authService.redirectUrl = url;

    //     // this.router.navigate(['/login']);
       
    // }
}