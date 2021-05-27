import { Component, OnInit } from '@angular/core';
import { NgForm,NgModel } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { Detail } from '../data.model';
import { Service } from '../data.service';


@Component({
  selector: 'app-data-create',
  templateUrl: './data-create.component.html',
  styleUrls: ['./data-create.component.css']
})
export class DataCreateComponent implements OnInit {

  constructor(public service: Service, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSaveDetails(form : NgForm){
    if(form.invalid){
      return;
    }
    this.service.addDetails(form.value.name,form.value.gender,form.value.phone);
  }

}
