import { NgModule } from '@angular/core';
import { XDatePickerComponent } from './date-picker.component';
import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPickerDateComponent } from './picker-date.component';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerYearComponent } from './picker-year.component';
import { XDateRangeComponent } from './date-range.component';
import { XPickerQuarterComponent } from './picker-quarter.component';
import { XDateQuarterPipe } from './date-quarter.pipe';

@NgModule({
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
    XDatePickerComponent,
    XDateRangeComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerQuarterComponent,
    XPickerYearComponent,
    XDateQuarterPipe
  ]
})
export class XDatePickerModule {}
