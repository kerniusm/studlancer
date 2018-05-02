import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  test: any;
  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
    'password': ''
  };
  logInMessage = {
    'success': '',
    'error': ''
  };
  validationMessage = {
    'email': {
      'required': 'Oops! Please enter your email address',
      'email': `That doesn't look like a valid email address`
    },
    'password': {
      'required': 'Forgot to enter a password!',
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
        'password': ['', [
          Validators.required,
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
    for (const field in this.logInMessage) {
      if (this.logInMessage[field]) {
        this.logInMessage[field] = '';
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

  logIn() {
    this._authService.emailLogIn(
      this.userForm.value['email'],
      this.userForm.value['password']
    ).then(
      () => {
        this.logInMessage.success = 'Logged in successfully!';
        setTimeout(() => this.router.navigate(['/landing']), 2000);
      }).catch(
      () => {
        this.logInMessage.error = 'Sorry..incorrect email address or password';
    });
  }

}
