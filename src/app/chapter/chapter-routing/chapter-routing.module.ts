import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { ChapterDetailsComponent } from '../chapter-details/chapter-details.component';

const routes: Routes = [
  { path: 'chapters', component: ChapterListComponent },
  { path: 'details/:id', component: ChapterDetailsComponent },
  { path: 'create', component: ChapterDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterRoutingModule {}
