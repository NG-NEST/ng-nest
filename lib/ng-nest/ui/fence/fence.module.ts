import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRowComponent } from './row.component';
import { XColComponent } from './col.component';

@NgModule({
  declarations: [XRowComponent, XColComponent],
  exports: [XRowComponent, XColComponent],
  imports: [CommonModule]
})
export class XFenceModule {}
