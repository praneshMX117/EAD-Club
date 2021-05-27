import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Detail } from './data.model';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class Service{
  private records: Detail[] = [];
  private updatedRecords = new Subject<Detail[]>();

  constructor(private http: HttpClient,private router:Router){}

  addDetails(name: string,gender: string,phone: string){
    const record: Detail = { id: "", name: name, gender: gender, phone: phone};
    this.http.post<{message:string,id:string}>('http://localhost:3000/api/data/',record)
      .pipe()
      .subscribe((response) => {
        console.log(response.message);
        const id = response.id;
        record.id = id;
        this.records.push(record);
        this.updatedRecords.next([...this.records]);
        this.router.navigate(['/']);
      });
  }

  getDetails(){
    this.http.get<{message: string, details: any}>('http://localhost:3000/api/data')
      .pipe(map((recordData) => {
        return recordData.details.map( (record:any) => {
          return {id:record._id, name:record.name, gender:record.gender, phone:record.phone };
        });
      }))
      .subscribe( (transformedDetails) => {
        this.records = transformedDetails;
        this.updatedRecords.next([...this.records]);
      });
  }

  getDetailUpdateListener(){
    return this.updatedRecords.asObservable();
  }

}
