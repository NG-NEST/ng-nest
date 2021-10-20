import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStepsComponent } from './steps.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XStepsProperty } from './steps.property';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XStepsComponent, XStepsProperty],
  exports: [XStepsComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XStepsModule {}
