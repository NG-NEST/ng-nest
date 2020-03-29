import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStepsComponent } from './steps.component';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XStepsComponent],
  exports: [XStepsComponent],
  imports: [CommonModule, XIconModule]
})
export class XStepsModule {}
