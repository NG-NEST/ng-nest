import { Component } from '@angular/core';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-bordered',
  imports: [XDatePickerComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {}
