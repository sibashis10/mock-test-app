import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestionSearchComponent } from '../question-search/question-search.component';
import { QuestionListComponent } from '../question-list/question-list.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';

const routes: Routes = [
  { path: 'search', component: QuestionSearchComponent },
  { path: ':chapterid/questions', component: QuestionListComponent },
  { path: ':chapterid/details/:id', component: QuestionDetailsComponent },
  { path: ':chapterid/create', component: QuestionDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
