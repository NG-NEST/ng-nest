import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAncherComponent } from './ancher.component';
import { XAffixModule } from '@ng-nest/ui/affix';
import { XSliderModule } from '@ng-nest/ui/slider';

@NgModule({
  declarations: [XAncherComponent],
  exports: [XAncherComponent],
  imports: [CommonModule, XAffixModule, XSliderModule]
})
export class XAncherModule {}
