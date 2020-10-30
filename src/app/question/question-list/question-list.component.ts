import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Question } from '../../models/question';
import { RepositoryService } from '../../services/repository.service';
import { QuestionService } from '../../services/question.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'questionImagePath',
    'rightAnswer',
    'multipleChoice',
    'marks',
    'negativeMark',
    'noOfOption',
    'details',
    'update',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Question>();

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private repository: RepositoryService,
    private questionService: QuestionService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuestions(1);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /* getQuestions(chapterId: number): void {
    this.questionService.getQuestions(chapterId).subscribe(
      (res) => {
        this.dataSource.data = res as Question[];
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  } */
  getQuestions(chapterId: number): void {
    this.repository.getData('chapters/' + chapterId + '/questions').subscribe(
      (res) => {
        this.dataSource.data = res as Question[];
      },
      (error) => {
        this.errorHandler.handleError(error);
      }
    );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public redirectToDetails = (id: string) => {
    let url: string = `/question/details/${id}`;
    this.router.navigate([url], { queryParams: { state: 'view' } });
  };
  public redirectToUpdate = (id: string) => {
    let url: string = `/question/details/${id}`;
    this.router.navigate([url]);
  };
  public redirectToDelete = (id: string) => {};
}
