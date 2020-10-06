import { Component, OnInit } from '@angular/core';

import { Chapter } from '../../../models/chapter';
import { Class } from '../../../models/class';
import { Subject } from '../../../models/subject';
import { CommonService } from '../../../services/common.service';
import { ChapterService } from '../../../services/chapter.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css'],
})
export class ChaptersComponent implements OnInit {
  chapter: Chapter;
  classes: Class[];
  subjects: Subject[];
  chapters: Chapter[];

  constructor(
    private commonService: CommonService,
    private chapterService: ChapterService
  ) {}

  ngOnInit(): void {
    this.chapter = new Chapter();
    this.getClasses();
    this.getSubjects();
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

  getChapters(classId: number, subjectId: number): void {
    this.chapterService
      .getChapters(classId, subjectId)
      .subscribe((chapters) => (this.chapters = chapters));
  }

  add(): void {
    if (!this.chapter.name) {
      return;
    }
    this.chapterService.addChapter(this.chapter).subscribe((chapter) => {
      this.chapters.push(chapter);
    });
  }

  delete(chapter: Chapter): void {
    this.chapters = this.chapters.filter((c) => c !== chapter);
    this.chapterService.deleteChapter(chapter).subscribe();
  }
}
