import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Clazz } from '../../models/clazz.model';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'classCode',
    'className',
    'details',
    'update',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Clazz>();

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
    this.getClasses();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getClasses(): void {
    this.repository.getData('classes/').subscribe(
      (res) => {
        this.dataSource.data = res as Clazz[];
        console.log(this.dataSource.data);
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
    let url: string = `/class/details/${id}`;
    this.router.navigate([url], { queryParams: { state: 'view' } });
  };
  public redirectToUpdate = (id: string) => {
    let url: string = `/class/details/${id}`;
    this.router.navigate([url]);
  };
  public redirectToDelete = (id: string) => {};
}
