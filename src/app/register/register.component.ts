import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,
    private router:Router,
    private _cookieService:CookieService) { }

  registered: boolean = false;
  validationErrors: boolean = false;
  regData: any;

  ngOnInit(): void {

  }
  
  onSubmit(object) {
    var obj = { email: object.email, name: object.name, password: object.password, type: 'Customer' };
    console.log(obj);
    if (obj.email == null || obj.email == '' || 
      obj.password == null || obj.password == '' ||
      obj.name == null || obj.name == '' ) {
      this.validationErrors = true;
    } else {
      this.validationErrors = false;
      this.http.post('http://localhost:3300/register', obj).subscribe(data => 
      {
        console.log(data);
        this.regData = data;
        this.registered = this.regData.auth;
        this._cookieService.set('auth', this.regData.token);
      })
    }
  }
  
}
