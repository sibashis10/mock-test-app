import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Subject } from '../../models/subject.model';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'subjectCode',
    'subjectName',
    'clazz.classCode',
    'details',
    'update',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Subject>();

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getSubjects(): void {
    this.repository.getData('subjects/').subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res as Subject[];
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
    let url: string = `/subject/details/${id}`;
    this.router.navigate([url], { queryParams: { state: 'view' } });
  };
  public redirectToUpdate = (id: string) => {
    let url: string = `/subject/details/${id}`;
    this.router.navigate([url]);
  };
  public redirectToDelete = (id: string) => {};
}
