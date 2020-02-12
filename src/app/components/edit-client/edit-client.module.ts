import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EditClientComponent } from './edit-client.component';

const routes: Routes = [
  {path: '', component: EditClientComponent}
];

@NgModule({
  declarations: [EditClientComponent],
  imports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlashMessagesModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
 exports: [RouterModule]
})
export class EditClientModule {}
