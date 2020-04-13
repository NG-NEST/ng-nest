import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XListComponent } from './list.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XListProperty } from './list.property';

@NgModule({
  declarations: [XListComponent, XListProperty],
  exports: [XListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule, XIconModule]
})
export class XListModule {}
