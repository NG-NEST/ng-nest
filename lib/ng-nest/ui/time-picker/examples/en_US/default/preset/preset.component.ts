import { Component } from '@angular/core';
import { XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class ExPresetComponent {
  model: any;

  preset = [
    'now',
    {
      label: '1 hour ago',
      func: () => {
        return XAddHours(new Date(), -1);
      }
    },
    {
      label: '2 hours after',
      func: () => {
        return XAddHours(new Date(), 2);
      }
    }
  ];

  change(date: any) {
    console.log(date);
  }
}
