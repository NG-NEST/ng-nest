import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XResultComponent } from './result.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XResultProperty } from './result.property';

@NgModule({
  declarations: [XResultComponent, XResultProperty],
  exports: [XResultComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective]
})
export class XResultModule {}
