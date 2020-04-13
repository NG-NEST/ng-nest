import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAffixComponent } from './affix.component';
import { XAffixProperty } from './affix.property';

@NgModule({
  declarations: [XAffixComponent, XAffixProperty],
  exports: [XAffixComponent],
  imports: [CommonModule]
})
export class XAffixModule {}
