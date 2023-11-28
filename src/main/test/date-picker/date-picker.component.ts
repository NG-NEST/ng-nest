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
  ExYearMonthComponent
} from '@ng-nest/ui/date-picker/examples';

@Component({
  selector: 'te-date-picker',
  standalone: true,
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
    ExYearMonthComponent
  ],
  templateUrl: './date-picker.component.html'
})
export class TeDatePickerComponent {}
