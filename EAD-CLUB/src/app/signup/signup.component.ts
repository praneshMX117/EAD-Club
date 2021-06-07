import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpFormGroup: FormGroup | undefined;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder,public service: Service,private _snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm(){
    this.signUpFormGroup = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern("[A-Za-z ]{3,32}")]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]],
      confirmPassword: ['', [Validators.required,Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]]
    });
  }

  get f() { // @ts-ignore
    return this.signUpFormGroup.controls; }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSaveDetails(/*form : NgForm*/){
    this.submitted = true;
    if(this.signUpFormGroup != null){
      if(this.signUpFormGroup.invalid){
        return;
      }
      if(this.signUpFormGroup.value.password != this.signUpFormGroup.value.confirmPassword){
        this.openSnackBar("Password Mismatched!!!","Ok");
        return;
      }
      this.service.addDetails(
        this.signUpFormGroup.value.name,
        this.signUpFormGroup.value.email,
        this.signUpFormGroup.value.password
      );
    }
  }

  ngOnInit() {
  }

}
