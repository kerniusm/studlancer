import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    public router: Router
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

  emailSignUp(
    email: string,
    username: string,
    password: string
  ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(
      (user) => {
        return this.updateUserData(user, username);
      }
    );
  }

  emailLogIn(
    email: string,
    password: string
  ) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogIn(provider);
  }

  private oAuthLogIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then(
      (credential) => {
        this.afStore.doc(`users/${credential.user.uid}`)
        .valueChanges()
        .pipe(take(1))
        .subscribe(user => {
          if (user && user['username']) {
            this.updateUserData(credential.user, user['username']);
            return this.router.navigate(['/landing']);
          } else {
            this.updateUserData(credential.user, '');
            return this.router.navigate(['/login']);
          }
        });
      }
    );
  }

  private updateUserData(user: any, username: string) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      username: username,
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
