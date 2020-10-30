import { Component, OnInit } from '@angular/core';
import { Chapter } from '../../models/chapter';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chapters: Chapter[];

  constructor(private chapterService: ChapterService) {}

  ngOnInit() {
    //this.getChapters(3, 1);
  }

  getChapters(classId: number, subjectId: number): void {
    this.chapterService
      .getChapters(classId, subjectId)
      .subscribe((chapters) => (this.chapters = chapters));
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  };
}
