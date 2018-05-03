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

  constructor(private _messageService: MessagesService) {
  }

  ngOnInit() {

  }

  getUser() {
  	console.log(this._messageService.getUser());
  	this._messageService.getUser();
  }

}
