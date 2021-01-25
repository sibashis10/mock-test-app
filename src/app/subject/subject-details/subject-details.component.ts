import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from '../../models/subject.model';
import { Clazz } from '../../models/clazz.model';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css'],
})
export class SubjectDetailsComponent implements OnInit {
  public title: string;
  public btnSubmit: string;
  public viewOnly: boolean = false;
  public imageSrc: string;
  public subject: Subject;
  public classes: any;
  public subjectForm: FormGroup;
  private dialogConfig: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getSubjectDetails();
    this.getClasses();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {},
    };
  }

  private getSubjectDetails = () => {
    let id: string = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      if (params.state === 'view') {
        this.title = 'Subject Details';
        this.btnSubmit = '';
        this.viewOnly = true;
      } else {
        this.title = 'Edit Subject';
        this.btnSubmit = 'Update';
      }
    });
    if (id) {
      let apiUrl: string = `subjects/${id}`;

      this.repository.getData(apiUrl).subscribe(
        (res) => {
          console.log(res);
          this.subject = res as Subject;
          this.setFormField();
        },
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
    } else {
      this.title = 'Create Subject';
      this.btnSubmit = 'Create';
      this.subject = new Subject();
      this.subject.clazz = new Clazz();
      this.setFormField();
    }
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

  private setFormField(): void {
    this.subjectForm = new FormGroup({
      subjectCode: new FormControl('0', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      subjectName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      clazz: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.subjectForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createSubject = (subjectFormValue: any) => {
    if (this.subjectForm.valid) {
      let cls = new Clazz();
      let sub = new Subject();
      cls.id = subjectFormValue.clazz;
      sub.subjectCode = subjectFormValue.subjectCode;
      sub.subjectName = subjectFormValue.subjectName;
      sub.clazz = cls;
      console.log(sub);
      this.executeSubjectCreation(sub);
    }
  };

  private executeSubjectCreation = (subjectFormValue: any) => {
    let apiUrl = 'subjects';
    this.repository.create(apiUrl, this.subject).subscribe(
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
