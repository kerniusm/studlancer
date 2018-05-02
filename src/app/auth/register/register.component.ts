import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { Unavailable } from '../../_validators/unavailable.validator';

type UserFields = 'email' | 'username' | 'password';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
    'username': '',
    'password': ''
  };
  signUpMessage = {
    'success': '',
    'error': ''
  };
  validationMessage = {
    'email': {
      'required': 'Oops! Please enter an email address',
      'email': `That doesn't look like a valid email address`
    },
    'username': {
      'required': 'Please enter a username',
      'minlength': 'Sorry..it must be 3 characters minimum',
      'maxlength': `Username can't be longer than 16 characters`
    },
    'password': {
      'required': 'Please enter a password',
      'pattern': 'It must contain at least one letter and one number',
      'minlength': 'Sorry.. it must be 6 characters minimum'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuilder.group(
      {
        'email': ['', [
          Validators.required,
          Validators.email
        ]],
        'username': ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16)
        ],
          Unavailable(this._authService.afStore)
        ],
        'password': ['', [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6)
        ]]
      }
    );
    this.userForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    for (const field in this.signUpMessage) {
      if (this.signUpMessage[field]) {
        this.signUpMessage[field] = '';
      }
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] = `${(messages as {[key: string]: string})[key]}`;
              }
            }
          }
        }
      }
    }
  }

  signUp() {
    this._authService.emailSignUp(
      this.userForm.value['email'],
      this.userForm.value['username'].toLowerCase(),
      this.userForm.value['password']
    ).then(
      () => {
        this.signUpMessage.success = 'You have successfully registered and logged in!';
        setTimeout(() => this.router.navigate(['/landing']), 2000);
      }).catch(
      () => {
        this.signUpMessage.error = `Sorry.. ${this.userForm.value['email']} is already in use by another account`;
    });
  }

  get username() {
    return this.userForm.get('username');
  }

}
