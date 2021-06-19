import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {HttpErrorResponse } from '@angular/common/http'
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor(private _eventsService : ArticleService , private _router : Router) { }
  specialEvents : any = []
  ngOnInit(): void {
    this._eventsService.getArticles().subscribe(
      (res: any)=>this.specialEvents = res ,
      (err : any) => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 )
          {
            this._router.navigate(['/home'] )
          }
        }
      }
    )
    console.log(" The fetched are "+this.specialEvents)
  }
  onSelect( event : any ){
    this._router.navigate(['news/articles',event.aid])
  }
}
