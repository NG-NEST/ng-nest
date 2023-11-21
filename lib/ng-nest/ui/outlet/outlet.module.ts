import { NgModule } from '@angular/core';
import { XOutletDirective } from './outlet.directive';

@NgModule({
  exports: [XOutletDirective],
  imports: [XOutletDirective]
})
export class XOutletModule {}
