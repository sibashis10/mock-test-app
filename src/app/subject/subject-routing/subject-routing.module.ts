import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { SubjectDetailsComponent } from '../subject-details/subject-details.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'details/:id', component: SubjectDetailsComponent },
  { path: 'create', component: SubjectDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
