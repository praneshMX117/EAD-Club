import { Component } from '@angular/core';
import {Service} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAD-CLUB';
  constructor( private _authService:Service ) {
  }
}
