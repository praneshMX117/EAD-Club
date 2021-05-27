import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Detail } from '../data.model';
import { Service } from '../data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, OnDestroy {

  details: Detail[] = [];
  private detailsSub: Subscription = new Subscription;

  constructor(public service: Service) { }

  ngOnInit(): void {
    this.service.getDetails();
    this.detailsSub = this.service.getDetailUpdateListener().subscribe((details : Detail[]) => {
        this.details = details;
    });
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }

}
