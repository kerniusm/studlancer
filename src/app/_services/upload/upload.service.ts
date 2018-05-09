import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  httpClient;

  constructor(
    public _authService: AuthService
  ) { }

  postFile(uploadFile: File): Observable<boolean> {
    const storageRef = firebase.storage().ref();;
    const formData: FormData = new FormData();

    formData.append('', uploadFile, uploadFile.name);
    return this.httpClient.post(storageRef, formData, { headers: 'header' })
      .map(() => { return true; }).catch((e) => this.handleError(e));
    }


    handleError(e){

    }

}
