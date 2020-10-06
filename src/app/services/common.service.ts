import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MessageService } from './message.service';

import { Class } from '../models/class';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.appRoot,
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET: classes from the server */
  getClasses(): Observable<Class[]> {
    let classUrl = environment.appRoot.concat('/classes');
    return this.http.get<Class[]>(classUrl).pipe(
      tap((_) => this.log('fetched classes')),
      catchError(this.handleError<Class[]>('getClasses', []))
    );
  }

  /** GET: subjects from the server */
  getSubjects(): Observable<Subject[]> {
    let subjectUrl = environment.appRoot.concat('/subjects');
    return this.http.get<Subject[]>(subjectUrl).pipe(
      tap((_) => this.log('fetched subjects')),
      catchError(this.handleError<Subject[]>('getSubjects', []))
    );
  }

  public upload(file: any) {
    let uploadUrl = environment.appRoot.concat('/uploadFile');
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    return this.http
      .post<any>(uploadUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ChapterService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ChapterService: ${message}`);
  }
}
