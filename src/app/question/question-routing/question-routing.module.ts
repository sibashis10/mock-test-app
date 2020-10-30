import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from '../question-list/question-list.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';

const routes: Routes = [
  { path: 'questions', component: QuestionListComponent },
  { path: 'details/:id', component: QuestionDetailsComponent },
  { path: 'create', component: QuestionDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
