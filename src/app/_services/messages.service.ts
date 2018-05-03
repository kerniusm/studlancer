import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service'; 

@Injectable()
export class MessagesService {

	private collection: AngularFirestoreCollection<any>;
	private messages: object[];

  constructor(
    private _firestoreService: AngularFirestore,
    private _authService: AuthService
    ) {
  }

}
