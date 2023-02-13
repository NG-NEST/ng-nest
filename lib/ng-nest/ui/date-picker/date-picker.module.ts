import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XIconModule } from '@ng-nest/ui/icon';
import { XButtonModule } from '@ng-nest/ui/button';
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
  XDateRangeProperty
} from './date-picker.property';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XBaseFormModule } from '@ng-nest/ui/base-form';
import { XDateRangeComponent } from './date-range.component';
import { XDateRangePortalComponent } from './date-range-portal.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [
    XDatePickerComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerYearComponent,
    XDatePickerProperty,
    XPickerDateProperty,
    XPickerMonthProperty,
    XPickerYearProperty,
    XDateRangeComponent,
    XDateRangePortalComponent,
    XDateRangeProperty
  ],
  exports: [
    XDatePickerComponent,
    XDateRangeComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerYearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XTimePickerModule,
    XInputModule,
    XLinkModule,
    XButtonModule,
    XIconModule,
    XI18nModule,
    XBaseFormModule,
    XOutletModule
  ]
})
export class XDatePickerModule {}
