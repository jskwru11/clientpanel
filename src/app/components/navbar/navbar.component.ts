import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  loggedInUser: string;
  needRegister: true;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.getAuthState()
    .subscribe(authState => {
      if (authState) {
        this.isAuthenticated = true;
        this.loggedInUser = authState.email;
      } else {
        this.isAuthenticated = false;
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.clearState();

  }

  clearState() {
    this.isAuthenticated = false;
    this.loggedInUser= null;
    this.needRegister = true;
    this.router.navigate(['/login']);
  }

}
