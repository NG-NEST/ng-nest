import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCardComponent } from './card.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XCardProperty } from './card.property';

@NgModule({
  declarations: [XCardComponent, XCardProperty],
  exports: [XCardComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XCardModule {}
