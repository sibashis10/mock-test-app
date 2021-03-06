import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'class',
    loadChildren: () =>
      import('../class/class.module').then((m) => m.ClassModule),
  },
  {
    path: 'subject',
    loadChildren: () =>
      import('../subject/subject.module').then((m) => m.SubjectModule),
  },
  {
    path: 'chapter',
    loadChildren: () =>
      import('../chapter/chapter.module').then((m) => m.ChapterModule),
  },
  {
    path: 'question',
    loadChildren: () =>
      import('../question/question.module').then((m) => m.QuestionModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
