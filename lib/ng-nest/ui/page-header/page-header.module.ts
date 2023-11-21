import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPageHeaderComponent } from './page-header.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPageHeaderProperty } from './page-header.property';

@NgModule({
  declarations: [XPageHeaderComponent, XPageHeaderProperty],
  exports: [XPageHeaderComponent],
  imports: [CommonModule, XButtonComponent]
})
export class XPageHeaderModule {}
