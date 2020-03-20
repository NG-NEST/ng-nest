import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XListComponent } from './list.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [XListComponent],
  exports: [XListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule, XIconModule]
})
export class XListModule {}
