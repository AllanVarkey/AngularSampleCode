import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable , of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients',
    ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]> {
    this.clients = this.clientCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
      const data = action.payload.doc.data() as Client;
      data.id = action.payload.doc.id;
      return data;
      });
      }));
      return this.clients;
   }
}
