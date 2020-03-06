import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationComponent } from './pagination.component';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XPaginationComponent],
  exports: [XPaginationComponent],
  imports: [CommonModule, XButtonModule]
})
export class XPaginationModule {}
