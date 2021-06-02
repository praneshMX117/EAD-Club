import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm,NgModel } from "@angular/forms";
import { Service } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  /*isLinear = false;
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }*/

  constructor(public service: Service) {
  }

  onSaveDetails(form : NgForm){
    if(form.invalid){
      return;
    }
    this.service.addDetails(form.value.name,form.value.email,form.value.password);
  }
  ngOnInit() {
  }
}
