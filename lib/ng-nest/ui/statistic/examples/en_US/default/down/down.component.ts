import { Component } from '@angular/core';
import { XAddDays } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-down',
  templateUrl: './down.component.html'
})
export class ExDownComponent {
  deadline = XAddDays(new Date(), 2).getTime();
}
