import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPageHeaderComponent } from './page-header.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPageHeaderProperty } from './page-header.property';

@NgModule({
  declarations: [XPageHeaderComponent, XPageHeaderProperty],
  exports: [XPageHeaderComponent],
  imports: [CommonModule, XButtonModule]
})
export class XPageHeaderModule {}
