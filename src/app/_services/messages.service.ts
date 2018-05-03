import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class MessagesService {

	private collection: AngularFirestoreCollection<any>;
	private messages: object[];
  private userId: string;
  sentMessages: object[];
  
  constructor(
    private _firestoreService: AngularFirestore,
    private _userService: UserService
    ) {
    this.collection = this._firestoreService.collection('users');
    this._userService.getUserInfo().subscribe(el => this.userId = el.uid);
  }

  getSentMessages() {
    return this.collection.doc(this.userId).collection('sentMessages').valueChanges();
  }

  getInbox() {
    return this.collection.doc(this.userId).collection('inbox').valueChanges();
  }

  getUser() {
  	return this.userId;
  }

}
