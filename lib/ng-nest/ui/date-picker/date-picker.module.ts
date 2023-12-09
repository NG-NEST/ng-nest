import { NgModule } from '@angular/core';
import { XDatePickerComponent } from './date-picker.component';
import { XDateRangeComponent } from './date-range.component';

@NgModule({
  exports: [XDatePickerComponent, XDateRangeComponent],
  imports: [XDatePickerComponent, XDateRangeComponent]
})
export class XDatePickerModule {}
