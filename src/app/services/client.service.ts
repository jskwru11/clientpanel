import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Client } from '../types';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client: Observable<Client>;
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;



  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
      this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
      this.client = this.afAuth.authState.pipe(switchMap(client => {
        if (client) {
          return this.afs.doc<Client>(`clients/${client.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      );
    }

    getClients(): Observable<Client[]> {
      // TODO: Get clients and add UID

      this.clients = this.clientsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.uid = action.payload.doc.id;
          return data;
        });
      }));
      return this.clients;
    }

    addClient(client: Client) {
      this.clientsCollection.add(client);
    }

    getClientById(uid: string): Observable<Client> {
      this.clientDoc = this.afs.doc<Client>(`clients/${uid}`);
      this.client = this.clientDoc.snapshotChanges().pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.uid = data.uid;
          return data;
        }
      }));
      return this.client;
    }

    updateClient(client: Client) {
      this.clientDoc = this.afs.doc<Client>(`clients/${client.uid}`);
      this.clientDoc.update(client);
    }

    deleteClient(client: Client) {
      this.clientDoc = this.afs.doc<Client>(`clients/${client.uid}`);
      this.clientDoc.delete();
    }
}
