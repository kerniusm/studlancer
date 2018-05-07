import { Component, OnInit, Input} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
@Input() test: String = '';
user: Object;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs.doc<any>(`users/h6RGO6MBQ5OVlP12lsyPchv68c63`).valueChanges()
    .subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
}

  }
