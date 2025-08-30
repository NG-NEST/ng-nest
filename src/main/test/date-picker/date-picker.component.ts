import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExDisabledDateComponent,
  ExFooterComponent,
  ExRangeComponent,
  ExTimeComponent,
  ExTodayComponent,
  ExYearMonthComponent,
  ExVariantComponent
} from '@ng-nest/ui/date-picker/examples';

@Component({
  selector: 'te-date-picker',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExDisabledDateComponent,
    ExFooterComponent,
    ExRangeComponent,
    ExTimeComponent,
    ExTodayComponent,
    ExYearMonthComponent,
    ExVariantComponent
  ],
  templateUrl: './date-picker.component.html'
})
export class TeDatePickerComponent {}
