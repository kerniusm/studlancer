import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	messages: any[];
	user: string = "user1";
	
  constructor(private message: MessagesService) {
  	this.messages = this.message.getMessages();
  }

  ngOnInit() {
  }

}
