import { Component, OnInit, Input} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
@Input() test:string = "";
user: any;
editable: Boolean = false;
  constructor(private afs: AngularFirestore,
  private _uS: UserService) { }

  ngOnInit() {
    this._uS.getUserInfo().subscribe(
    user=> this.user = user
    );
}
toggleName(){
  this.editable = !this.editable
}
saveName(){
  this._uS.updateName(this.user.uid, this.user.displayName)
  .then(
    () => this.editable = false
  );
}
  }
