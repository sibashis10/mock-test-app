import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterRoutingModule } from './chapter-routing/chapter-routing.module';
import { ChapterDetailsComponent } from './chapter-details/chapter-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChapterListComponent, ChapterDetailsComponent],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ChapterModule {}
