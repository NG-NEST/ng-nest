import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent, XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-footer',
  imports: [FormsModule, XDatePickerComponent, XDateRangeComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class ExFooterComponent {
  modelPicker = signal<Date | null>(null);
  modelRange = signal<Date | null>(null);
  modelMonth = signal<Date | null>(null);
  modelYear = signal<Date | null>(null);
  modelDateTime = signal<Date | null>(null);

  change(event: any) {
    console.log(event);
  }
}
