import { NgModule } from '@angular/core';
import { XInnerComponent } from './inner.component';

@NgModule({
  exports: [XInnerComponent],
  imports: [XInnerComponent]
})
export class XInnerModule {}
