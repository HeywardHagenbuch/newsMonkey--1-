import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,
    private router:Router,
    private _cookieService:CookieService) { }

  loggedIn: boolean = false;
  loginError: boolean = false;
  validationErrors: boolean = false;
  logData: any;

  ngOnInit(): void {

  }

  onSubmit(object) {
    var obj = { email: object.email, password: object.password };
    console.log(obj);
    if (obj.email == null || obj.email == '' || obj.password == null || obj.password == '') {
      this.validationErrors = true;
    } else {
      this.validationErrors = false;
      this.http.post('http://localhost:3300/login', obj).subscribe(data => 
      {
        console.log(data);
        this.logData = data;
        this.loggedIn = this.logData.auth;
        console.log(this.loggedIn);
        this.loginError = !this.loggedIn;
        if (this.loggedIn) {
          this._cookieService.set('auth', this.logData.token);
          if (this.logData.type == 'Admin') {
            this.router.navigate(['/adminHome']);
          } else if (this.logData.type == 'Customer') {
            this.router.navigate(['/customerHome']);
          }
        } else {
          //display login error
        }
      })
    }
  }

}
