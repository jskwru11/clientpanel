import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { MaterialModule } from '../../material.module';
import { ClientDetailsComponent } from './client-details.component';

const routes: Routes = [
  {path: '', component: ClientDetailsComponent}
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlashMessagesModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [ClientDetailsComponent]
})

export class ClientDetailsModule {}
