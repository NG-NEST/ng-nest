import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStepsComponent } from './steps.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XStepsProperty } from './steps.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XStepsComponent, XStepsProperty],
  exports: [XStepsComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective]
})
export class XStepsModule {}
