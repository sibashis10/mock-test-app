import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Question } from '../../models/question';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  public title: string;
  public btnSubmit: string;
  public viewOnly: boolean = false;
  public imageSrc: string;
  public question: Question;
  public questionForm: FormGroup;
  private dialogConfig: any;

  @ViewChild('fileUpload', { static: false })
  private fileUpload: ElementRef;
  private files = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private commonService: CommonService,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getQuestionDetails();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {},
    };
  }

  private getQuestionDetails = () => {
    let id: string = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      if (params.state === 'view') {
        this.title = 'Question Details';
        this.btnSubmit = '';
        this.viewOnly = true;
      } else {
        this.title = 'Edit Question';
        this.btnSubmit = 'Update';
      }
    });
    if (id) {
      let apiUrl: string = `questions/${id}`;

      this.repository.getData(apiUrl).subscribe(
        (res) => {
          this.question = res as Question;
          this.setFormField();
          this.imageSrc = this.question.questionImagePath;
        },
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
    } else {
      this.title = 'Create Question';
      this.btnSubmit = 'Create';
      this.question = new Question();
      this.setFormField();
    }
  };

  private setFormField(): void {
    this.questionForm = new FormGroup({
      noOfOption: new FormControl('0', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.max(10),
        Validators.min(1),
      ]),
      rightAnswer: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      marks: new FormControl('0', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.max(10),
        Validators.min(1),
      ]),
      negativeMark: new FormControl('0', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.max(10),
        Validators.min(0),
      ]),
      multipleChoice: new FormControl(false),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.questionForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createQuestion = (questionFormValue: any) => {
    if (this.questionForm.valid) {
      this.executeQuestionCreation(questionFormValue);
    }
  };

  private executeQuestionCreation = (questionFormValue: any) => {
    let apiUrl = 'questions';
    this.repository.create(apiUrl, this.question).subscribe(
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

  public onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  public uploadFile(file: any) {
    this.commonService.upload(file).subscribe((event: any) => {
      if (typeof event === 'object') {
        console.log(event.body.fileDownloadUri);
        this.question.questionImagePath = event.body.fileDownloadUri;
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  public onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      // this.uploadFiles();
    };
    fileUpload.click();
  }
}
