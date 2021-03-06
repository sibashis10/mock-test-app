import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionRoutingModule } from './question-routing/question-routing.module';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [QuestionSearchComponent, QuestionListComponent, QuestionDetailsComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class QuestionModule {}
