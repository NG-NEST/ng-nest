import { NgModule } from '@angular/core';
import { XKeywordDirective } from './keyword.directive';

@NgModule({
  exports: [XKeywordDirective],
  imports: [XKeywordDirective]
})
export class XKeywordModule {}
