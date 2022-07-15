import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XFormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XControlComponent } from './control.component';
import { XFormProperty, XControlProperty } from './form.property';
import { XInputModule } from '@ng-nest/ui/input';
import { XSelectModule } from '@ng-nest/ui/select';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XInputNumberModule } from '@ng-nest/ui/input-number';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XRateModule } from '@ng-nest/ui/rate';
import { XSliderSelectModule } from '@ng-nest/ui/slider-select';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XIconModule } from '@ng-nest/ui/icon';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XBaseFormModule } from '@ng-nest/ui/base-form';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XI18nModule } from '@ng-nest/ui/i18n';

const modules = [
  XLayoutModule,
  XIconModule,
  XInputModule,
  XSelectModule,
  XCascadeModule,
  XCheckboxModule,
  XColorPickerModule,
  XDatePickerModule,
  XInputNumberModule,
  XRadioModule,
  XRateModule,
  XSliderSelectModule,
  XSwitchModule,
  XTimePickerModule,
  XTextareaModule,
  XFindModule,
  XAutoCompleteModule,
  XOutletModule,
  XBaseFormModule,
  XI18nModule
];

@NgModule({
  declarations: [XFormComponent, XControlComponent, XFormProperty, XControlProperty],
  exports: [XFormComponent, XControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...modules]
})
export class XFormModule {}
