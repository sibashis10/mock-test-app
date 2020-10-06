import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../../../models/question';
import { Class } from '../../../models/class';
import { Subject } from '../../../models/subject';
import { Chapter } from '../../../models/chapter';

import { CommonService } from '../../../services/common.service';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question: Question;
  classes: Class[];
  subjects: Subject[];

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private questionService: QuestionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getClasses();
    this.getSubjects();
    this.getQuestion();
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

  getQuestion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService
      .getQuestion(id)
      .subscribe((question) => (this.question = question));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.questionService
      .updateQuestion(this.question)
      .subscribe(() => this.goBack());
  }
}
