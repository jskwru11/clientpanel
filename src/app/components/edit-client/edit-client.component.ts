import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder } from '@angular/forms';


import { ClientService } from '../../services/client.service';
import { Client } from '../../types';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  uid: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit = true;
  editForm = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  });

  constructor(
    private cs: ClientService,
    private router: Router,
    private ar: ActivatedRoute,
    private fms: FlashMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.uid = this.ar.snapshot.params.id;
    this.cs.getClientById(this.uid)
    .subscribe(client => {
      if (client != null) {
        this.client = client;
      }
    });
  }

  editClient() {
  }

}
