import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Clazz } from 'src/app/models/clazz.model';
import { Subject } from 'src/app/models/subject.model';
import { Chapter } from 'src/app/models/chapter.model';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css'],
})
export class QuestionSearchComponent implements OnInit {
  public title: string;
  public classes: any;
  public subjects: any;
  public chapters: any;
  public searchForm: FormGroup;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title = 'Search Question List';
    this.getClasses();

    this.setFormField();
  }

  private setFormField(): void {
    this.searchForm = new FormGroup({
      class: new FormControl('', []),
      subject: new FormControl('', []),
      chapter: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.searchForm.controls[controlName].hasError(errorName);
  };

  getClasses(): void {
    this.repository.getData('classes/').subscribe(
      (res) => {
        this.classes = res as Clazz[];
        console.log(this.classes);
      },
      (error) => {
        this.errorHandler.handleError(error);
      }
    );
  }

  onSelectClass(id: any): void {
    this.getSubjects(id);
  }

  getSubjects(id: number): void {
    let apiUrl: string = `classes/${id}/subjects`;
    this.repository.getData(apiUrl).subscribe(
      (res) => {
        this.subjects = res as Subject[];
        console.log(this.subjects);
      },
      (error) => {
        this.errorHandler.handleError(error);
      }
    );
  }

  onSelectSubject(id: any): void {
    this.getChapters(id);
  }

  getChapters(id: number): void {
    let apiUrl: string = `subjects/${id}/chapters`;
    this.repository.getData(apiUrl).subscribe(
      (res) => {
        this.chapters = res as Chapter[];
        console.log(this.chapters);
      },
      (error) => {
        this.errorHandler.handleError(error);
      }
    );
  }

  public search = (searchFormValue: any) => {
    if (this.searchForm.valid) {
      this.executeSearch(searchFormValue);
    }
  };

  private executeSearch = (searchFormValue: any) => {
    console.log(searchFormValue.chapter);
    let url: string = `question/${searchFormValue.chapter}/questions`;
    this.router.navigate([url]);
  };
}
