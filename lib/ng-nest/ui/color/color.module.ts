import { NgModule } from '@angular/core';
import { XColorComponent } from './color.component';

@NgModule({
  exports: [XColorComponent],
  imports: [XColorComponent]
})
export class XColorModule {}
