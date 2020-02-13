import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from '../../types';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuthenticated: false;
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private fms: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAuthState()
    .subscribe(authState => {
      if (authState) {
        this.router.navigate(['/']);
      }
    })
  }

  onLogin() {
    const userData = this.loginForm.value;
    this.authService.login(userData)
    .then(response => {
      this.fms.show('User logged in.', { cssClass: 'new-login', timeout: 4000});
      this.router.navigate(['/']);
    }).catch(error => {
      this.fms.show(error, { cssClass: 'failed-login', timeout: 4000})
    });

  }

}
