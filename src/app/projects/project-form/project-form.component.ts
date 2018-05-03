import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload/upload.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  hidden_hours: boolean = true;
  hidden_fixed: boolean = true;

  newFile: File = null;

  constructor(
    private _uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  detectFile(files: FileList){
    this.newFile = files.item(0);
  }

  uploadFile(){
    this._uploadService.postFile(this.detectFile).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

}
