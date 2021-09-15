import { Component } from '@angular/core';
import { XAddDays } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class ExTodayComponent {
  preset = [
    'yesterday',
    'today',
    'tomorrow',
    {
      label: '7天后',
      func: () => {
        return XAddDays(new Date(), 7);
      }
    }
  ];
  constructor() {}
}
