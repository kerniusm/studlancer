import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../_services/user.service';
import { Unavailable } from '../../_validators/unavailable.validator';

type UserFields = 'username';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  userId: String;

  usernameForm: FormGroup;
  formErrors: FormErrors = {
    'username': ''
  };
  validationMessage = {
    'username': {
      'required': 'Please enter a username',
      'minlength': 'Username must be 3 characters minimum',
      'maxlength': `Username can't be longer than 16 characters`
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this._userService.getUserInfo().subscribe(
      user => this.userId = user.uid
    );
  }

  buildForm() {
    this.usernameForm = this.formBuilder.group(
      {
        'username': ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16)
        ],
          Unavailable(this._authService.afStore)
        ],
      }
    );
    this.usernameForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.usernameForm) {
      return;
    }
    const form = this.usernameForm;
    if (Object.prototype.hasOwnProperty.call(this.formErrors, this.formErrors['username'])) {
      this.formErrors['username'] = '';
      const control = form.get('username');
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage['username'];
        if (control.errors) {
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors['username'] = `${(messages as {[key: string]: string})[key]}`;
            }
          }
        }
      }
    }
  }

  createUsername() {
    this._authService.updateUsername(
      this.usernameForm.value['username'].toLowerCase(),
      this.userId
    ).then(
      () => {
        // this.signUpMessage.success = 'You have successfully registered and logged in!';
        return this.router.navigate(['/landing']);
    });
  }

  get username() {
    return this.usernameForm.get('username');
  }

}
