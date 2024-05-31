import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAddDays } from '@ng-nest/ui/core';
import { XDatePickerComponent, XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-today',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent, XDateRangeComponent],
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class ExTodayComponent {
  modelDate = signal<Date | null>(null);
  modelDatetime = signal<Date | null>(null);
  modelRangeDate = signal<Date | null>(null);
  modelRangeDatetime = signal<Date | null>(null);
  preset = signal([
    'yesterday',
    'today',
    'tomorrow',
    {
      label: '七天后',
      func: () => {
        return XAddDays(new Date(), 7);
      }
    }
  ]);

  presetRange = signal([
    'lastWeek',
    'thisWeek',
    'nextWeek',
    // 'lastMonth',
    'thisMonth',
    // 'nextMonth',
    // 'lastYear',
    'thisYear',
    // 'nextYear',
    {
      label: '5天内',
      func: () => {
        let now = new Date();
        return [now, XAddDays(new Date(), 5)];
      }
    }
  ]);

  change(value: any) {
    console.log(value);
  }
}
