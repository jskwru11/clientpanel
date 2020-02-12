import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../types';




@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  uid: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private cs: ClientService,
    private router: Router,
    private ar: ActivatedRoute,
    private fms: FlashMessagesService) { }

  ngOnInit() {
    // TODO: Get UID from URL
    this.uid = this.ar.snapshot.params.id;
    // TODO: Get client
    this.cs.getClientById(this.uid)
    .subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
  }

  onDeleteClicked() {
    this.client.uid = this.uid;
    this.cs.deleteClient(this.client);
    this.fms.show('Client deleted', {
      cssClass: 'text-red',
      timeout: 4000
    });
    this.router.navigate(['/']);
  }

  updateBalance() {
    this.client.uid = this.uid;
    this.cs.updateClient(this.client);
    this.fms.show('Balance updated', {
      cssClass: 'text-green',
      timeout: 4000
    });
  }

}
