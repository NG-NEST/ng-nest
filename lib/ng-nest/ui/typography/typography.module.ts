import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTypographyComponent } from './typography.component';
import { XTypographyProperty } from './typography.property';

@NgModule({
  declarations: [XTypographyComponent, XTypographyProperty],
  exports: [XTypographyComponent],
  imports: [CommonModule]
})
export class XTypographyModule {}
