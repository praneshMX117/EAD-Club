import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Service} from "../data.service";
import {Detail} from "../data.model";
import {Router} from '@angular/router'
import {HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: Detail[] | undefined;
  public loginUserData : any = {}

  constructor(public service: Service , private _router : Router ) {
  }

  onLoggingIn(form : NgForm){
    if(form.invalid){
      return;
    }
    this.service.login(this.loginUserData).subscribe((res: any) => {
        localStorage.setItem( 'token' , res.token )
        this._router.navigate(['/news'])
      },
      (err: any) => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 )
          {
            alert(err.error)
          }
        }
      }
    );
  }
  ngOnInit() {
  }
}
