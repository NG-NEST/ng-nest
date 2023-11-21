import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDatePickerComponent } from './date-picker.component';
import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPickerDateComponent } from './picker-date.component';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerYearComponent } from './picker-year.component';
import {
  XDatePickerProperty,
  XPickerDateProperty,
  XPickerMonthProperty,
  XPickerYearProperty,
  XDateRangeProperty,
  XPickerQuarterProperty
} from './date-picker.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XDateRangeComponent } from './date-range.component';
import { XDateRangePortalComponent } from './date-range-portal.component';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XPickerQuarterComponent } from './picker-quarter.component';
import { XDateQuarterPipe } from './date-quarter.pipe';

@NgModule({
  declarations: [
    XDatePickerComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerQuarterComponent,
    XPickerYearComponent,
    XDatePickerProperty,
    XPickerDateProperty,
    XPickerMonthProperty,
    XPickerQuarterProperty,
    XPickerYearProperty,
    XDateRangeComponent,
    XDateRangePortalComponent,
    XDateRangeProperty,
    XDateQuarterPipe
  ],
  exports: [
    XDatePickerComponent,
    XDateRangeComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerQuarterComponent,
    XPickerYearComponent,
    XDateQuarterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XTimePickerModule,
    XInputModule,
    XLinkComponent,
    XButtonComponent,
    XIconComponent,
    XI18nPipe,
    XControlValueAccessor,
    XOutletDirective
  ]
})
export class XDatePickerModule {}
