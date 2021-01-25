import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectRoutingModule } from './subject-routing/subject-routing.module';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SubjectListComponent, SubjectDetailsComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SubjectModule {}
