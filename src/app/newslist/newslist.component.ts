import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateService } from '../administrate.service';
import { TitleList } from '../titleList';


@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class NewslistComponent implements OnInit {
  titleList:TitleList[]=[];
  filterArray:TitleList[]=[]
  searchKey: string = '';


  expression:boolean= true;
  
  flag: boolean=false;
  msg: String="";
  
  constructor(
    private fb:FormBuilder,
    private adminservice:AdministrateService,
    private router: Router, 
    private route: ActivatedRoute) {
 
     }

  ngOnInit(): void {
      this.loadNews();
  }

  loadNews() {
    this.adminservice.getNewsList().subscribe(
      data=>{this.titleList = data
        this.filterArray=data
        this.titleList.forEach ( x => {x.lock=true })
      }); 
  }

  onSearch(){
    let s=this.searchKey.trim().toLocaleLowerCase();
    this.filterArray=this.titleList.filter(function(news){
      if(news.title.includes(s)){
        return news
      }
      else
      return ;
      
    })


  }
  editRow(news:TitleList){
    this.titleList.forEach( x => {
      if (x._id == news._id) {
      x.lock = false;
      }
      });
  }

  updateRow(news:TitleList,i:number){
    console.log(news._id);
    this.titleList.forEach( x => {
      if (x._id == news._id) {
        x.lock = true;      
        this.adminservice.onUpdate(news)   
      }  
      });        
  }
 
  cancel(news:TitleList){
  
    this.titleList.forEach( x => {
      if (x._id == news._id) {
      x.lock = true;
      }
      });
  }

  deleteRow(news: TitleList){
    var delBtn = confirm("Do you want to delete?");
    if ( delBtn == true ) {
      this.adminservice.onDelete(news);
      window.location.reload();
    }   
  }
  
}
