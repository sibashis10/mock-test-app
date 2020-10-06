import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Question } from '../../../models/question';
import { Class } from '../../../models/class';
import { Subject } from '../../../models/subject';
import { Chapter } from '../../../models/chapter';

import { CommonService } from '../../../services/common.service';
import { ChapterService } from '../../../services/chapter.service';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  imageSrc: string;
  classId: number;
  subjectId: number;
  question: Question;
  classes: Class[];
  subjects: Subject[];
  chapters: Chapter[];
  questions: Question[];

  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef;
  files = [];

  constructor(
    private commonService: CommonService,
    private chapterService: ChapterService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.question = new Question();
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

  onClassSubjectChange($event: any) {
    console.debug('event >>> {}', $event.source._id);
    if ($event.source._id === 'class') {
      this.classId = $event.value;
    } else {
      this.subjectId = $event.value;
    }

    if (this.classId > 0 && this.subjectId > 0) {
      this.chapterService
        .getChapters(this.classId, this.subjectId)
        .subscribe((chapters) => (this.chapters = chapters));
    }
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  getQuestions(chapterId: number): void {
    this.questionService
      .getQuestions(chapterId)
      .subscribe((questions) => (this.questions = questions));
  }

  add(): void {
    this.uploadFiles();
  }

  delete(question: Question): void {
    this.questions = this.questions.filter((c) => c !== question);
    this.questionService.deleteQuestion(question).subscribe();
  }

  uploadFile(file: any) {
    this.commonService.upload(file).subscribe((event: any) => {
      if (typeof event === 'object') {
        console.log(event.body.fileDownloadUri);
        this.question.questionImagePath = event.body.fileDownloadUri;

        this.questionService
          .addQuestion(this.question)
          .subscribe((question) => {
            this.question = question;
          });
        this.questions.push(this.question);
        this.imageSrc = '';
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      // this.uploadFiles();
    };
    fileUpload.click();
  }
}
