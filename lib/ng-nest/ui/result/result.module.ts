import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XResultComponent } from './result.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XResultProperty } from './result.property';

@NgModule({
  declarations: [XResultComponent, XResultProperty],
  exports: [XResultComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XResultModule {}
