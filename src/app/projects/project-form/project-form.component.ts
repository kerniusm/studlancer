import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload/upload.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import{ AuthService } from '../../core/auth.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  rate = true;

  hidden_hours: boolean = true;
  hidden_fixed: boolean = true;

  newFile: File = null;

  clients: any = {
    name: "",
    type: ""
  }

  projects: any = {
    client_uid: "",
    fileURL: "",
    attachments: {
      path: "",
      title: ""
    }
  }
  id: string;

  constructor(
    private _uploadService: UploadService,
    private _authService: AuthService,
    private router: Router,
    private aR: ActivatedRoute,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.id = this.aR.snapshot.params['id'];
    if(this.id){
      this._uploadService.getProject(this.id).valueChanges()
      .subscribe(
        projects => this.projects = projects
      );
    }else{
      this.createProject();
    }
  }

  createProject(){
    this._authService.user.subscribe(
      user => {
        this._uploadService.createProjectForm(user.uid).then(
          projects => {
            return this.router.navigate(['project-form', projects.id]);
          }
        );
      }
    )
  }

  uploadFile(event) {
    const fileName = event.target.files[0].name;
    const file = event.target.files[0];
    const filePath = `attachments/${this.id}/${fileName}`;
    const task = this.storage.upload(filePath, file);

    task.downloadURL().subscribe(
      url => {
        const attachments = {
          "fileName": fileName,
          "path": url,
          "uploaded_at": new Date().getTime()
        }
        this.afs.collection<any>('projects').doc(this.id)
        .collection('attachments').add(attachments)
      }
    )
  }


}
