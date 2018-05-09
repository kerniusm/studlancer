import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload/upload.service';

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

  constructor(
    private _uploadService: UploadService,
    private _authService: AuthService,
    private router: Router,
    private aR: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  // detectFile(files: FileList){
  //   this.newFile = files.item(0);
  // }
  //
  // uploadFile(){
  //   this._uploadService.postFile(this.newFile).subscribe(data => {
  //     return;
  //     }, error => {
  //       console.log(error);
  //     });
  // }

}
