import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClassListComponent } from '../class-list/class-list.component';
import { ClassDetailsComponent } from '../class-details/class-details.component';

const routes: Routes = [
  { path: 'classes', component: ClassListComponent },
  { path: 'details/:id', component: ClassDetailsComponent },
  { path: 'create', component: ClassDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
