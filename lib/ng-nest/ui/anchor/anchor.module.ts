import { NgModule } from '@angular/core';
import { XAnchorComponent } from './anchor.component';
import { XAnchorInnerComponent } from './anchor-inner.component';

@NgModule({
  exports: [XAnchorComponent, XAnchorInnerComponent],
  imports: [XAnchorComponent, XAnchorInnerComponent]
})
export class XAnchorModule {}
