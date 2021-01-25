import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Clazz } from '../../models/clazz.model';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css'],
})
export class ClassDetailsComponent implements OnInit {
  public title: string;
  public btnSubmit: string;
  public viewOnly: boolean = false;
  public clazz: Clazz;
  public classForm: FormGroup;
  private dialogConfig: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getClassDetails();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {},
    };
  }

  private getClassDetails = () => {
    let id: string = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      if (params.state === 'view') {
        this.title = 'Class Details';
        this.btnSubmit = '';
        this.viewOnly = true;
      } else {
        this.title = 'Edit Class';
        this.btnSubmit = 'Update';
      }
    });
    if (id) {
      let apiUrl: string = `classes/${id}`;

      this.repository.getData(apiUrl).subscribe(
        (res) => {
          this.clazz = res as Clazz;
          this.setFormField();
        },
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
    } else {
      this.title = 'Create Class';
      this.btnSubmit = 'Create';
      this.clazz = new Clazz();
      this.setFormField();
    }
  };

  private setFormField(): void {
    this.classForm = new FormGroup({
      classCode: new FormControl('0', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      className: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.classForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createClass = () => {
    if (this.classForm.valid) {
      this.executeClassCreation();
    }
  };

  private executeClassCreation = () => {
    let apiUrl = 'classes';
    this.repository.create(apiUrl, this.clazz).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed().subscribe((result) => {
          this.location.back();
        });
      },
      (error) => {
        this.errorHandler.dialogConfig = { ...this.dialogConfig };
        this.errorHandler.handleError(error);
      }
    );
  };
}
