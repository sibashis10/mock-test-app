import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { Subject } from '../../models/subject.model';
import { Chapter } from '../../models/chapter.model';
import { Clazz } from 'src/app/models/clazz.model';

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.css'],
})
export class ChapterDetailsComponent implements OnInit {
  public title: string;
  public btnSubmit: string;
  public viewOnly: boolean = false;
  public chapter: Chapter;
  public classes: any;
  public subjects: any;
  public chapterForm: FormGroup;
  private dialogConfig: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getChapterDetails();
    this.getClasses();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {},
    };
  }

  private getChapterDetails = () => {
    let id: string = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      if (params.state === 'view') {
        this.title = 'Chapter Details';
        this.btnSubmit = '';
        this.viewOnly = true;
      } else {
        this.title = 'Edit Chapter';
        this.btnSubmit = 'Update';
      }
    });
    if (id) {
      let apiUrl: string = `chapters/${id}`;

      this.repository.getData(apiUrl).subscribe(
        (res) => {
          this.chapter = res as Chapter;
          console.log('****@@@@@' + this.chapter.subject.clazz.id);
          this.onSelectClass(this.chapter.subject.clazz.id);
          this.setFormField();
        },
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
    } else {
      this.title = 'Create Chapter';
      this.btnSubmit = 'Create';
      this.chapter = new Chapter();
      this.chapter.subject = new Subject();
      this.chapter.subject.clazz = new Clazz();
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

  private setFormField(): void {
    this.chapterForm = new FormGroup({
      name: new FormControl('0', [
        Validators.required,
        Validators.maxLength(120),
      ]),
      class: new FormControl('', [
        Validators.required,
      ]),
      subject: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.chapterForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createChapter = (chapterFormValue: any) => {
    if (this.chapterForm.valid) {
      this.executeChapterCreation(chapterFormValue);
    }
  };

  private executeChapterCreation = (chapterFormValue: any) => {
    let apiUrl = 'chapters';
    this.repository.create(apiUrl, this.chapter).subscribe(
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
