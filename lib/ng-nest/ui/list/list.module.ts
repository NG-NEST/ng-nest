import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XListComponent } from './list.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [XListComponent],
  exports: [XListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconModule]
})
export class XListModule {}
