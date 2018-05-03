import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  createUsername: Boolean = false;
  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
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
    'password': {
      'required': 'Please enter a password',
      'pattern': 'It must contain at least one letter and one number',
      'minlength': 'Sorry.. it must be 6 characters minimum'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
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
      this.userForm.value['password']
    )
    .then(() => {
      this.signUpMessage.success = 'You have been successfully registered!';
      setTimeout(() => this.createUsername = true, 1500);
    })
    .catch(() => {
      this.signUpMessage.error = `Sorry.. ${this.userForm.value['email']} is already in use by another account`;
    });
  }

  usernameProvider(state) {
    this.createUsername = state;
  }

  messageProvider(message) {
    this.signUpMessage.success = message;
  }

}
