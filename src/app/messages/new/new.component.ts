import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Name } from '../../_validators/name.validator';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../core/auth.service';

type UserFields = 'recipient';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  messageForm: FormGroup;
  formErrors: FormErrors = {
    'recipient': ''
  };
  validationMessage = {
    'recipient': {
      'required': 'Please enter a recipient',
    }
  };

	message: object = {
		to: 'sEwsk0oOimN8OUOduhGWTNFdlL92',
		subject: '',
		text: ''
	}

  constructor(
    private _messageService: MessagesService,
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.messageForm = this.formBuilder.group(
      {
        'recipient': ['', [
          Validators.required,
        ],
          Name(this._authService.afStore)
        ],
      }
    );
    this.messageForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.messageForm) {
      return;
    }
    const form = this.messageForm;
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

  get recipient() {
    return this.messageForm.get('recipient')
  }

  sendMessage() {
  	this._messageService.sendMessage(
  		this.message['to'],
  		this.message['subject'],
  		this.message['text']
  	);
    console.log('Message sent')
  }

}
