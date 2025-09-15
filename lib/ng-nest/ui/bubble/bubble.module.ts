import { NgModule } from '@angular/core';
import { XBubbleComponent } from './bubble.component';
import { XBubblesComponent } from './bubbles.component';

@NgModule({
  exports: [XBubbleComponent, XBubblesComponent],
  imports: [XBubbleComponent, XBubblesComponent]
})
export class XBubbleModule {}
