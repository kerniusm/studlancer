import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Output() createUsername = new EventEmitter();
  @Output() submitMessage = new EventEmitter();
  noUsername: Boolean = true;
  message: String = 'Logged in successfully!';

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  googleLogIn() {
    this._authService.googleLogIn()
    .then((credential) => {
      this.submitMessage.emit(this.message);
      this._authService.user
      .pipe(take(1))
      .subscribe(user => {
        if (user && user['username']) {
          this._authService.updateUserData(credential.user, user['username']);
          return this.router.navigate(['/landing']);
        } else {
          this._authService.updateUserData(credential.user);
          this.createUsername.emit(this.noUsername);
        }
      });
    });
  }

}
