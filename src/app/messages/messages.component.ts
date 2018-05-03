import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  inbox: boolean = true;
  sent: boolean = false;
  newMessage: boolean = false;

  inboxMessages: any[];
  sentMessages: any[];

  constructor(private _messageService: MessagesService) {
  }

  ngOnInit() {
    this.getSentMessages();
  }


  getSentMessages() {
    this._messageService.getSentMessages().subscribe(el => console.log(el))
  }

  getInbox() {
    this._messageService.getInbox().subscribe(el => console.log(el))
  }

  showInbox() {
    this.inbox = true;
    this.sent = false; 
    this.newMessage = false;
  }

  showSent() {
    this.sent = true;
    this.inbox = false;
    this.newMessage = false;
  }

  showNew() {
    this.newMessage = true;
    this.inbox = false;
    this.sent = false;
  }

}
