import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {HttpErrorResponse } from '@angular/common/http'
import {Service} from "../data.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  specialEvents: any = []

  constructor(private _service: Service, private _router: Router) {
  }

  ngOnInit(): void {

    /* We could use this if any veriification is needed when verifying only when users logged in could use news
    this._service.getSpecialEvents().subscribe(
      (res: any)=>this.specialEvents = res ,
      (err : any) => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 )
          {
            this._router.navigate(['/login'] )
          }
        }

      }

    )*/
  }
}
