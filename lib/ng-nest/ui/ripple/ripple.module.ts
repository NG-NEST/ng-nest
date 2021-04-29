import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRippleDirective } from './ripple.directive';
import { XRippleProperty } from './ripple.property';

@NgModule({
  declarations: [XRippleDirective, XRippleProperty],
  exports: [XRippleDirective],
  imports: [CommonModule]
})
export class XRippleModule {}
