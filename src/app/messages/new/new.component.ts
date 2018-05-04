import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

	message: object = {
		to: 'sEwsk0oOimN8OUOduhGWTNFdlL92',
		subject: '',
		text: ''
	}

  constructor(private _messageService: MessagesService) { }

  ngOnInit() {
  }

  sendMessage() {
  	this._messageService.sendMessage(
  		this.message['to'],
  		this.message['subject'],
  		this.message['text']
  	);
  }

}
