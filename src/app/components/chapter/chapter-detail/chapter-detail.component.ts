import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Chapter } from '../../../models/chapter';
import { Class } from '../../../models/class';
import { Subject } from '../../../models/subject';
import { ChapterService } from '../../../services/chapter.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.css'],
})
export class ChapterDetailComponent implements OnInit {
  chapter: Chapter;
  classes: Class[];
  subjects: Subject[];

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private chapterService: ChapterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getClasses();
    this.getSubjects();
    this.getChapter();
  }

  getClasses(): void {
    this.commonService
      .getClasses()
      .subscribe((classes) => (this.classes = classes));
  }

  getSubjects(): void {
    this.commonService
      .getSubjects()
      .subscribe((subjects) => (this.subjects = subjects));
  }

  getChapter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chapterService
      .getChapter(id)
      .subscribe((chapter) => (this.chapter = chapter));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.chapterService
      .updateChapter(this.chapter)
      .subscribe(() => this.goBack());
  }
}
