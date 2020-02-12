import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Client } from '../../types';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnAdd = true;

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    balance: [0]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService
    ) { }

  ngOnInit() {

  }

  addClient() {
    const data = this.clientForm.value;
    const newClient: Client = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      balance: data.balance
    };
    this.clientService.addClient(newClient);
    this._flashMessagesService.show('New client added successfully!',
    { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
  }

}
