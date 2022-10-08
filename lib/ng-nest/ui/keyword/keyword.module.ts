import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XKeywordDirective } from './keyword.directive';
import { XKeywordProperty } from './keyword.property';

@NgModule({
  declarations: [XKeywordDirective, XKeywordProperty],
  exports: [XKeywordDirective],
  imports: [CommonModule]
})
export class XKeywordModule {}
