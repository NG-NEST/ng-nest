import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCardComponent } from './card.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XCardComponent],
  exports: [XCardComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XCardModule {}
