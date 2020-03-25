import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAnchorComponent } from './anchor.component';
import { XAffixModule } from '@ng-nest/ui/affix';
import { XSliderModule } from '@ng-nest/ui/slider';

@NgModule({
  declarations: [XAnchorComponent],
  exports: [XAnchorComponent],
  imports: [CommonModule, XAffixModule, XSliderModule]
})
export class XAnchorModule {}
