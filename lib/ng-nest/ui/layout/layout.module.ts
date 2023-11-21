import { NgModule } from '@angular/core';
import { XRowComponent } from './row.component';
import { XColComponent } from './col.component';

@NgModule({
  exports: [XRowComponent, XColComponent],
  imports: [XRowComponent, XColComponent]
})
export class XLayoutModule {}
