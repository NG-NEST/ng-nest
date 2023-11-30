import { NgModule } from '@angular/core';
import { XMessageComponent } from './message.component';

@NgModule({
  exports: [XMessageComponent],
  imports: [XMessageComponent]
})
export class XMessageModule {}
