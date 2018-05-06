import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

type UserFields = 'recipient' | 'subject' | 'message';
type FormErrors = {[user in UserFields]: string};

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
	user: object;
	invalid: boolean = false;
	messageTo;

  messageForm: FormGroup;
  formErrors: FormErrors = {
    'recipient': '',
    'subject': '',
    'message': '',
  };
  validationMessage = {
    'recipient': {
      'required': 'Please enter a recipient',
    },
    'subject': {
    	'required': 'Please enter subject of the message',
    },
    'message': {
    	'required': 'Please enter a message'
    }
  };

	message: object = {
		to: '',
		subject: '',
		message: ''
	}

  constructor(
    private _messageService: MessagesService,
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private _userService: UserService,
    private _firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  validateRecipient(value) {
			this._firestore
  		.collection('users', el => el.where('username','==',value))
  		.valueChanges()
  		.subscribe(el => {
  			if (Object.keys(el).length) {
  				this.user = el[0];
			  	// this.user['uid'];
  				console.log(this.message['to'])
  				this.invalid = false;
  			} else {
  				this.invalid = true;
  				console.log('n ok')
  			}
  		})
  }

  buildForm() {
    this.messageForm = this.formBuilder.group(
      {
        'recipient': ['', [
          Validators.required,
        ]],
        'subject': ['', [
        	Validators.required,
        ]],
        'message': ['', [
        	Validators.required
        ]]
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
    console.log(this.user['uid']);
    console.log(this.messageForm.value['subject']);
    console.log(this.messageForm.value['message']);
  	this._messageService.sendMessage(
  		this.user['uid'],
  		this.messageForm.value['subject'],
  		this.messageForm.value['message']
  	);
  }

}
