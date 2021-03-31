import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministrateService } from '../administrate.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AdminheaderComponent implements OnInit {

  constructor(
    private adminservice:AdministrateService,
    private fb:FormBuilder,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['/logout']);
  }

}
