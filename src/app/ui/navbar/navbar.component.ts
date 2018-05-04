import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  	this._authService.user.subscribe(el => this.user = el)
  }

  logout() {
  	this._authService.logOut();
  }

}
