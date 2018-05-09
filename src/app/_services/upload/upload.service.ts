import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  HttpClient;

  constructor(
    public _authService: AuthService,
    private afs: AngularFirestore
  ) { }

  uploadPicture(upload, id){
    const storageRef = firebase.storage().ref();
    const imageName = new Date().getTime();
    const uploadTask = storageRef.child(`clients/${imageName}`).put(upload);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes)
        * 100
      },
      (error) => {
        console.log('error')
      },
      () => {
        if(uploadTask.snapshot.downloadURL){
          const newPicture = {
            fileURL: uploadTask.snapshot.downloadURL,
            title: imageName,
          }
          this.updatePicture(newPicture, id);
          return;
        }else{
          console.log('file not loaded')
        }
      }
    );
  }

  getOnePost(id){
    return this.afs.doc<any>(`clients/${id}`);
  }

  private updatePicture(upload, id){
    return this.getOnePost(id).update(upload);
  }

  // postFile(uploadFile: File): Observable<boolean> {
  //   const storageRef = firebase.storage().ref();;
  //   const formData: FormData = new FormData();
  //   let headers = new Headers();
  //
  //   formData.append('', uploadFile, uploadFile.name);
  //   return this.HttpClient.post(storageRef, formData, { headers: headers })
  //     .map(() => { return true; }).catch((e) => this.handleError(e));
  //   }
  //
  //
  //   handleError(e){
  //
  //   }

}
