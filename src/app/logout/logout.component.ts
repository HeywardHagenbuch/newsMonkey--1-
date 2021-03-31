import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _cookieService:CookieService) { }

  ngOnInit(): void {
    this._cookieService.set('auth', '');
  }

}
