import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Detail } from './data.model';
import { Router } from '@angular/router';
//import {response} from "express";

@Injectable({providedIn:'root'})
export class Service{

  private token: string | undefined;
  private id: string | undefined;
  private name: string | undefined;
  private email : string | undefined;


  private records: Detail[] = [];
  private updatedRecords = new Subject<Detail[]>();

  constructor(private http: HttpClient,private router:Router){}

  getToken(){
    return this.token;
  }

  addDetails(name: string,email: string,password: string){
    const record: Detail = { id: "", name: name, email: email, password: password};
    this.http.post<{message:string,id:string}>('http://localhost:3000/api/data/signup',record)
      .pipe()
      .subscribe((response) => {
        console.log(response.message);
        const id = response.id;
        record.id = id;
        this.records.push(record);
        this.updatedRecords.next([...this.records]);
        this.router.navigate(['/']).then(r => {
          console.log("Page Redirected to Home.");
        });
      });
  }

  /*checkUserDetails(name: string,email: string,password: string){
    const record: Detail = { id: "", name: name, email: email, password: password};
    this.http.get<{message:string,id:string}>('http://localhost:3000/api/data/')
      .pipe()
      .subscribe((response) => {
          console.log(response);
      });
  }*/
  getDetails(){
    this.http.get<{message: string, details: any}>('http://localhost:3000/api/data')
      .pipe(map((recordData) => {
        return recordData.details.map( (record:any) => {
          return {id:record._id, name:record.name, email:record.email, password:record.password};
        });
      }))
      .subscribe( (transformedDetails) => {
        this.records = transformedDetails;
        this.updatedRecords.next([...this.records]);
        console.log(this.records);
      });
    return this.records;
  }

  getDetailUpdateListener(){
    return this.updatedRecords.asObservable();
  }

  login(name: string,email: string,password: string){
    const record: Detail = { id: "", name: name, email: email, password: password};
    this.http.post<{message: string,token: string,id: string,name: string,email: string}>('http://localhost:3000/api/data/login',record)
      .subscribe(response =>{
        this.token = response.token;
        this.id = response.id;
        this.name = response.name;
        this.email = response.email;
        console.log(response);
        if(response.message == "Auth Successful")
          alert("Hello " + response.name)
        else
          alert(response.message)
      })
  }

}
