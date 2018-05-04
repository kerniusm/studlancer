import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

type UserFields = 'email';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() previousStep = new EventEmitter();

  showLoading: Boolean = false;
  emailForm: FormGroup;
  formErrors: FormErrors = {
    'email': ''
  };
  submitMessage = {
    'success': '',
    'error': ''
  };
  validationMessage = {
    'email': {
      'required': 'Oops! Please enter an email address',
      'email': `That doesn't look like a valid email address`
    },
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
    this.emailForm = this.formBuilder.group(
      {
        'email': ['', [
          Validators.required,
          Validators.email
        ]],
      }
    );
    this.emailForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.emailForm) {
      return;
    }
    for (const field in this.submitMessage) {
      if (this.submitMessage[field]) {
        this.submitMessage[field] = '';
      }
    }
    const form = this.emailForm;
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

  resetPassword() {
    this.showLoading = !this.showLoading;
    const email = this.emailForm.value['email'];
    this._authService.resetPassword(email)
    .then(() => {
        this.showLoading = !this.showLoading;
        this.submitMessage.success = `The link with a password reset was sent to ${email}!`;
        setTimeout(() => this.previousStep.emit(), 5000);
      }
    )
    .catch(() => {
      this.showLoading = !this.showLoading;
      this.submitMessage.error = 'The email you entered seems to be unregistered';
    });
  }

}
