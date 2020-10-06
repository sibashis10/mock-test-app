import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ChaptersComponent } from './components/chapter/chapters/chapters.component';
import { ChapterDetailComponent } from './components/chapter/chapter-detail/chapter-detail.component';

import { QuestionsComponent } from './components/question/questions/questions.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chapters', component: ChaptersComponent },
  { path: 'chapter-detail/:id', component: ChapterDetailComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'question-detail/:id', component: QuestionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
