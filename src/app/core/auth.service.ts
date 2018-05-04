import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { firebase } from '@firebase/app';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthService {

  user: Observable<any | null>;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.user = this.afAuth.authState
    .switchMap(
      user => {
        if (user) {
          return this.afStore.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      }
    );
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return this.updateUserData(user);
    });
  }

  emailLogIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogIn(provider);
  }

  updateUsername(username: string, userId) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${userId}`);
    const userData: any = {
      username: username
    };
    return userRef.set(userData, { merge: true });
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  private oAuthLogIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  public updateUserData(user: any, username?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      username: username || '',
      photoURL: user.photoURL || 'https://goo.gl/8kwFW5'
    };
    return userRef.set(userData, { merge: true });
  }

  logOut() {
    this.afAuth.auth.signOut()
    .then(
      () => this.router.navigate([''])
    );
  }

}
