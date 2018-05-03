import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private afStore: AngularFirestore) {
    afStore.firestore.settings({ timestampsInSnapshots: true });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 0bf0e1017c5e76f17778d22ebbf0187265ea3ef4
