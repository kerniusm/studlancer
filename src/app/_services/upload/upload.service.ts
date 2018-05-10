import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {


  constructor(
    public _authService: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  createProjectForm(uid){
          const project = {
          "user_uid": uid,
          "status": "draft",
          "projectName": "",
          "projectText": "",
          "projectTime": "",
          "projectPrice": "",
          "created_at": new Date().getTime(),
        }
        return this.afs.collection('projects').add(project);

      }

    getProject(id){
      return this.afs.doc<any>(`projects/${id}`);
    }



}
