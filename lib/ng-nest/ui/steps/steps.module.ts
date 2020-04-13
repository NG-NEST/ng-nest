import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStepsComponent } from './steps.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XStepsProperty } from './steps.property';

@NgModule({
  declarations: [XStepsComponent, XStepsProperty],
  exports: [XStepsComponent],
  imports: [CommonModule, XIconModule]
})
export class XStepsModule {}
