import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateService } from '../administrate.service';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AddnewsComponent implements OnInit {
  formModel: FormGroup;
  loading=false;
  msg="";
  alertService: any;
   urlRegex= /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  constructor(
    private adminservice:AdministrateService,
    private fb:FormBuilder,
    private router: Router, 
    private route: ActivatedRoute) { 
      this.formModel=this.fb.group
          ({
              title:['', Validators.required],
              description:['',Validators.required],
              url:['', [Validators.required,Validators.pattern(this.urlRegex)]],
              imageUrl:['', [Validators.required,Validators.pattern(this.urlRegex)]],
              publishedAt:['', Validators.required]            
          }        
        )
    }

  ngOnInit(): void {
    
  }
onSubmit() {
    this.adminservice.addnews(this.formModel.value)
      .subscribe( data => { 
      });
      location.reload();
        this.msg = 'News is added successfully';
        
    }
  

}
