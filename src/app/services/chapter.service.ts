import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Chapter } from '../models/chapter';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  private chaptersUrl = environment.appRoot + '/chapters';

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

  /** GET: chapters from the server */
  getChapters(classId: number, subjectId: number): Observable<Chapter[]> {
    return this.http
      .get<Chapter[]>(
        this.chaptersUrl.concat(
          '/',
          classId.toString(),
          '/',
          subjectId.toString()
        )
      )
      .pipe(
        tap((_) => this.log('fetched chapters')),
        catchError(this.handleError<Chapter[]>('getChapters', []))
      );
  }

  /** GET: chapter by id. Return `undefined` when id not found */
  getChapterNo404<Data>(id: number): Observable<Chapter> {
    const url = `${this.chaptersUrl}/?id=${id}`;
    return this.http.get<Chapter[]>(url).pipe(
      map((chapters) => chapters[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} chapter id=${id}`);
      }),
      catchError(this.handleError<Chapter>(`getChapter id=${id}`))
    );
  }

  /** GET: chapter by id. Will 404 if id not found */
  getChapter(id: number): Observable<Chapter> {
    const url = `${this.chaptersUrl}/${id}`;
    return this.http.get<Chapter>(url).pipe(
      tap((_) => this.log(`fetched chapter id=${id}`)),
      catchError(this.handleError<Chapter>(`getChapter id=${id}`))
    );
  }

  /** GET: chapters whose name contains search term */
  searchChapters(term: string): Observable<Chapter[]> {
    if (!term.trim()) {
      // if not search term, return empty chapter array
      return of([]);
    }
    return this.http.get<Chapter[]>(`${this.chaptersUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found chapters matching "${term}"`)
          : this.log(`no chapters matching "${term}"`)
      ),
      catchError(this.handleError<Chapter[]>('searchChapters', []))
    );
  }

  /** POST: add a new chapter to the server */
  addChapter(chapter: Chapter): Observable<Chapter> {
    return this.http
      .post<Chapter>(this.chaptersUrl, chapter, this.httpOptions)
      .pipe(
        tap((newChapter: Chapter) =>
          this.log(`added chapter w/ id=${newChapter.id}`)
        ),
        catchError(this.handleError<Chapter>('addChapter'))
      );
  }

  /** DELETE: delete the chapter from the server */
  deleteChapter(chapter: Chapter | number): Observable<Chapter> {
    const id = typeof chapter === 'number' ? chapter : chapter.id;
    const url = `${this.chaptersUrl}/${id}`;

    return this.http.delete<Chapter>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted chapter id=${id}`)),
      catchError(this.handleError<Chapter>('deleteChapter'))
    );
  }

  /** PUT: update the chapter on the server */
  updateChapter(chapter: Chapter): Observable<any> {
    console.log('chapter to be deleted > ' + chapter);
    let updateUrl = this.chaptersUrl.concat('/', chapter.id.toString());
    return this.http.put(updateUrl, chapter, this.httpOptions).pipe(
      tap((_) => this.log(`updated chapter id=${chapter.id}`)),
      catchError(this.handleError<any>('updateChapter'))
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
