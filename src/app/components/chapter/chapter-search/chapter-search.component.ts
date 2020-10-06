import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Chapter } from '../../../models/chapter';
import { ChapterService } from '../../../services/chapter.service';

@Component({
  selector: 'app-chapter-search',
  templateUrl: './chapter-search.component.html',
  styleUrls: ['./chapter-search.component.css'],
})
export class ChapterSearchComponent implements OnInit {
  chapters$: Observable<Chapter[]>;
  private searchTerms = new Subject<string>();

  constructor(private chapterService: ChapterService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.chapters$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.chapterService.searchChapters(term))
    );
  }
}
