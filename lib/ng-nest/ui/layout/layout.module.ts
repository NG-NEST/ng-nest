import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRowComponent } from './row.component';
import { XColComponent } from './col.component';
import { XRowProperty, XColProperty } from './layout.property';

@NgModule({
  declarations: [XRowComponent, XColComponent, XRowProperty, XColProperty],
  exports: [XRowComponent, XColComponent],
  imports: [CommonModule]
})
export class XLayoutModule {}
