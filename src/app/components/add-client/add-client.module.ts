import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AddClientComponent } from './add-client.component';

const routes: Routes = [
  {path: '', component: AddClientComponent}
];

@NgModule({
  declarations: [AddClientComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClientModule {}
