import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCardComponent } from './card.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCardProperty } from './card.property';

@NgModule({
  declarations: [XCardComponent, XCardProperty],
  exports: [XCardComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective]
})
export class XCardModule {}
