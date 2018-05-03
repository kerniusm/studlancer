import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(
    private _authService: AuthService,
    private afStore: AngularFirestore
  ) { }

  getUserInfo() {
    return this._authService.user;
  }

  getUser(uid: string) {
    return this.afStore.doc<any>(`users/${uid}`);
  }
}

