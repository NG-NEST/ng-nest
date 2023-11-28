import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent, XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-footer',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent, XDateRangeComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class ExFooterComponent {
  modelPicker: any;

  modelRange: any;

  modelMonth: any;

  modelYear: any;

  modelDateTime: any;

  change(event: any) {
    console.log(event);
  }
}
