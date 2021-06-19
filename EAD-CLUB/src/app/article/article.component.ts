import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap , Router} from "@angular/router";
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor( private route : ActivatedRoute , private router:Router , private _article : ArticleService) { }
  public article_id : any;
  public obj : any = {};
  public article : any = [];
  public author : any = [];
  public loaded : boolean = false
  ngOnInit(): void {
    this.route.paramMap.subscribe( (params : ParamMap) =>{
      this.article_id = parseInt( <string>params.get('id'))
      this.getArticle( this.article_id )
    })

  }

  getArticle( id : Number ){
    let obj1 = {
      aid : id
    }
    this._article.getOneArticle(  obj1  ).subscribe(
      (res: any) => {
          this.article = res[0]
          this.author = res[1]
        console.log("The article and auth are : " + res + res[0] + res[1] + res[0][0] )
          this.loaded = true
      },
      (err: any) => {
        console.log("Could not fetch One Article " + err.error )
        this.router.navigate(['notfound'])
      }
    )
  }
  goPrevious(){
    let previousId = this.article_id - 1
    this.router.navigate(['../' , previousId ],{relativeTo:this.route})
  }
  goNext(){
    let nextId = this.article_id + 1
    this.router.navigate(['../' , nextId ],{relativeTo:this.route})
  }
}
