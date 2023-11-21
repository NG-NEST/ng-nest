import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRateComponent } from './rate.component';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XRateProperty } from './rate.property';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XRateComponent, XRateProperty],
  exports: [XRateComponent],
  imports: [CommonModule, FormsModule, XButtonComponent, XIconComponent, XControlValueAccessor]
})
export class XRateModule {}
