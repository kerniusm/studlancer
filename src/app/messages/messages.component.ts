import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
	router: string;

  inboxMessages: any[];
  sentMessages: any[];

  constructor(
  	private _messageService: MessagesService,
  	private _activeRoute: ActivatedRoute,
  	private _router: Router
  ) {
  	this._activeRoute.params.subscribe(el => {
  		if (!el.component) {
  			this.router = 'new';
  			this._router.navigate(['messages', 'new'])
  		} else {
  			this.router = el.component
  		}
  	})
  }

  ngOnInit() {
  }

	goTo(value: string) {
		this.router = value;
		this._router.navigate(['messages', value])
	}

  getInbox() {
  	// console.log(this._messageService.getInbox());
  	this._messageService.getInbox().subscribe(el => console.log(el));
  }

  getSentMessages() {
  	console.log(this._messageService.getSentMessages());
  	this._messageService.getSentMessages();
  }

  getUserId() {
  	console.log(this._messageService.getUser());
  	this._messageService.getUser();
  }

}
