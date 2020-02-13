import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    LoginComponent
  ]
})

export class LoginModule {
}
