import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessagesService {

	private collection: AngularFirestoreCollection<any>;
	private messages: Observable<any[]>;
	private sentMessages: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection('users', ref => ref.where('email','==','lukas@lukas.lukas'));
    this.messages = this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    });
  }

  getId() {
    return this.messages;
  }

}
