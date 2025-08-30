import { Component } from '@angular/core';
import { XDatePickerComponent, XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-variant',
  imports: [XDatePickerComponent, XDateRangeComponent],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class ExVariantComponent {}
