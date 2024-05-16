import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAddHours } from '@ng-nest/ui/core';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-preset',
  standalone: true,
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './preset.component.html'
})
export class ExPresetComponent {
  model = signal('');

  preset = signal([
    'now',
    {
      label: '1小时前',
      func: () => {
        return XAddHours(new Date(), -1);
      }
    },
    {
      label: '2小时后',
      func: () => {
        return XAddHours(new Date(), 2);
      }
    }
  ]);

  change(date: any) {
    console.log(date);
  }
}
