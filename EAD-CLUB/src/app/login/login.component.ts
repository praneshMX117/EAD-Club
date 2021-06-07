import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Service} from "../data.service";
import {Detail} from "../data.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: Detail[] | undefined;
  constructor(public service: Service) {
  }

  onLoggingIn(form : NgForm){
    if(form.invalid){
      return;
    }
    //this.service.getDetails(form.value.name,form.value.email,form.value.password);
    //this.result = this.service.getDetails();
    //console.log(this.result);
    this.service.login(form.value.name,form.value.email,form.value.password);
  }
  ngOnInit() {
    /*this.service.getDetails().subscribe(result => {
      this.result = result;
    })*/
  }
  /*isLinear = false;
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }*/

}
