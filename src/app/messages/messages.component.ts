import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	messages: any[];
	sentMessages: any[];

  constructor(private message: MessagesService) {
  	this.message.getMessages().subscribe(el => this.messages = el);
  	this.message.getSentMessages().subscribe(el => this.sentMessages = el);
  }

  ngOnInit() {
  }

}
