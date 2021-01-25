import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRoutingModule } from './class-routing/class-routing.module';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClassListComponent, ClassDetailsComponent],
  imports: [
    CommonModule,
    ClassRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ClassModule {}
