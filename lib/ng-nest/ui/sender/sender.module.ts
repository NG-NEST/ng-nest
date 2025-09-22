import { NgModule } from '@angular/core';
import { XSenderComponent } from './sender.component';
import { XSenderStopComponent } from './stop.component';

@NgModule({
  exports: [XSenderComponent, XSenderStopComponent],
  imports: [XSenderComponent, XSenderStopComponent]
})
export class XSenderModule {}
