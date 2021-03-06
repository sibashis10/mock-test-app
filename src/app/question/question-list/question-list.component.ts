import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Question } from '../../models/question.model';
import { RepositoryService } from '../../services/repository.service';
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
  public chapterId: string;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chapterId = this.route.snapshot.paramMap.get("chapterid"); // Snapshot param
    this.getQuestions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getQuestions(): void {
    this.repository.getData('chapters/' + this.chapterId + '/questions').subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res as Question[];
      },
      (error) => {
        this.dataSource = null;
        this.errorHandler.handleError(error);
      }
    );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public redirectToDetails = (id: string) => {
    let url: string = `/question/${this.chapterId}/details/${id}`;
    this.router.navigate([url], { queryParams: { state: 'view' } });
  };

  public redirectToUpdate = (id: string) => {
    let url: string = `/question/${this.chapterId}/details/${id}`;
    this.router.navigate([url]);
  };

  public redirectToDelete = (id: string) => {};
}
