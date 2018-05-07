import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class MessagesService {

	private collection: AngularFirestoreCollection<any>;
	private sentMessages: AngularFirestoreCollection<any>;
	private inbox: AngularFirestoreCollection<any>;
  public user: string;
  
  constructor(
    private _firestoreService: AngularFirestore,
    private _userService: UserService
    ) {
    this.collection = this._firestoreService.collection('users');
    this._userService.getUserInfo().subscribe(el => {
    	this.user = el;
    	this.sentMessages = this.collection.doc(el.uid).collection('sentMessages');
    	this.inbox = this.collection.doc(el.uid).collection('inbox');
    });
  }


  getUser() {
  	return this.user;
  }

  getInbox() {
  	return this.inbox.valueChanges();
  }

  getSentMessages() {
  	return this.sentMessages.valueChanges();
  }

  sendMessage(
  	to,
  	subject,
  	text,
  ) {
  	let userId = this.user['uid'];
  	let userName = this.user['username'];
  	this.collection.doc(userId).collection('sentMessages').add({to, subject, text});
  	this.collection.doc(to).collection('inbox').add({userName, subject, text});
  }

}
