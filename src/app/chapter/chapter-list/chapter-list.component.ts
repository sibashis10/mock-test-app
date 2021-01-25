import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Chapter } from '../../models/chapter.model';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css'],
})
export class ChapterListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'name',
    'subject.clazz.classCode',
    'subject.subjectName',
    'details',
    'update',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Chapter>();

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
    this.getChapters();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getChapters(): void {
    this.repository.getData('chapters/').subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res as Chapter[];
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
    let url: string = `/chapter/details/${id}`;
    this.router.navigate([url], { queryParams: { state: 'view' } });
  };
  public redirectToUpdate = (id: string) => {
    let url: string = `/chapter/details/${id}`;
    this.router.navigate([url]);
  };
  public redirectToDelete = (id: string) => {};
}
