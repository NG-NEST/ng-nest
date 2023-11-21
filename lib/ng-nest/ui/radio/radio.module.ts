import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XRadioProperty } from './radio.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTagModule } from '@ng-nest/ui/tag';

@NgModule({
  declarations: [XRadioComponent, XRadioProperty],
  exports: [XRadioComponent],
  imports: [
    CommonModule,
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XTagModule,
    XOutletDirective,
    XControlValueAccessor
  ]
})
export class XRadioModule {}
