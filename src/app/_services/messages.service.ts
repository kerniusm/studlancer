import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessagesService {

	private collection: AngularFirestoreCollection<any>;
	private messages: Observable<any[]>;
	private sentMessages: Observable<any[]>;
	user: string = "user1";

  constructor(private afs: AngularFirestore) {
  	this.messages = afs.collection('messages', ref => ref.where('to', '==', this.user)).snapshotChanges().map(actions => {
  		return actions.map(a => {
  			const data = a.payload.doc.data();
  			const id = a.payload.doc.id;
  			return {id, ...data}
  		})
  	});
  	this.sentMessages = afs.collection('messages', ref => ref.where('from','==', this.user)).snapshotChanges().map(actions => {
  		return actions.map(a => {
  			const data = a.payload.doc.data();
  			const id = a.payload.doc.id;
  			return {id, ...data}
  		})
  	});
  }

  getMessages() {
  	return this.messages;
  }

  getSentMessages() {
  	return this.sentMessages;
  }

}
