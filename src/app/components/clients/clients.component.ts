import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../types';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'balance', 'details'];
  datasource: Client[];
  total: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.datasource = clients;
      this.total = this.getTotal();
    });
  }

  getTotal(): number {
    const total = this.datasource.reduce((totalBalance, client) => {
      return  totalBalance + parseFloat(client.balance.toString());
    }, 0);
    return total;
  }

}
