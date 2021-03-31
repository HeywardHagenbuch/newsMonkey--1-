import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TitleList } from './titleList';

@Injectable({
  providedIn: 'root'
})
export class AdministrateService {
  addnewsUrl="http://localhost:3300/addNews";
  newsListUrl="http://localhost:3300/newslist";
  EditUrl="http://localhost:3300/updateNews";
  deleteUrl="http://localhost:3300/deleteNews";

  constructor(private http:HttpClient, 
    private router: Router) { }
    
    addnews(news:TitleList){
      console.log("this is", news)
      return this.http.post(this.addnewsUrl, news)
    }

    getNewsList(): Observable<TitleList[]>{
      return this.http.get<TitleList[]>(this.newsListUrl)
    }

    onDelete(news:any){
      console.log(news)
      this.http.put(this.deleteUrl, news).subscribe(data => {
        console.log("Deleted");
      });
    }

    onUpdate(news:any){
      this.http.put(this.EditUrl, news).subscribe(data => {
        console.log("Updated");
      });
    }

}
