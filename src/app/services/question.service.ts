import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from '../models/question';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionsUrl = environment.appRoot + '/questions';
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

  /** GET: questions from the server */
  getQuestions(chapterId: number): Observable<Question[]> {
    let url = environment.appRoot.concat(
      '/chapters/',
      chapterId.toString(),
      '/questions'
    );
    return this.http.get<Question[]>(url).pipe(
      tap((_) => this.log('fetched questions')),
      catchError(this.handleError<Question[]>('getQuestions', []))
    );
  }

  /** GET: question by id. Return `undefined` when id not found */
  getQuestionNo404<Data>(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/?id=${id}`;
    return this.http.get<Question[]>(url).pipe(
      map((questions) => questions[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} question id=${id}`);
      }),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }

  /** GET: question by id. Will 404 if id not found */
  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap((_) => this.log(`fetched question id=${id}`)),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }

  /** GET: questions whose name contains search term */
  searchQuestions(term: string): Observable<Question[]> {
    if (!term.trim()) {
      // if not search term, return empty question array
      return of([]);
    }
    return this.http.get<Question[]>(`${this.questionsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found questions matching "${term}"`)
          : this.log(`no questions matching "${term}"`)
      ),
      catchError(this.handleError<Question[]>('searchChapters', []))
    );
  }

  /** POST: add a new question to the server */
  addQuestion(question: Question): Observable<Question> {
    console.debug('Question entity to be saved >>> ', question);
    return this.http
      .post<Question>(this.questionsUrl, question, this.httpOptions)
      .pipe(
        tap((newQuestion: Question) =>
          this.log(`added question w/ id=${newQuestion.id}`)
        ),
        catchError(this.handleError<Question>('addQuestion'))
      );
  }

  /** DELETE: delete the question from the server */
  deleteQuestion(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}`;

    return this.http.delete<Question>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted question id=${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  /** PUT: update the question on the server */
  updateQuestion(question: Question): Observable<any> {
    console.log('question to be deleted > ' + question);
    let updateUrl = this.questionsUrl.concat('/', question.id.toString());
    return this.http.put(updateUrl, question, this.httpOptions).pipe(
      tap((_) => this.log(`updated question id=${question.id}`)),
      catchError(this.handleError<any>('updateQuestion'))
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

  /** Log a QuestionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuestionService: ${message}`);
  }
}
