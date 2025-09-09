import { Component } from '@angular/core';
import { XDatePickerComponent, XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-float-label',
  imports: [XDatePickerComponent, XDateRangeComponent],
  templateUrl: './float-label.component.html',
  styleUrls: ['./float-label.component.scss']
})
export class ExFloatLabelComponent {}
