import { Component, OnInit } from '@angular/core';
import { Chapter } from '../../models/chapter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chapters: Chapter[];

  constructor() {}

  ngOnInit() {
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  };
}
