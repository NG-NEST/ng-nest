import { Component, signal } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XAddDays } from '@ng-nest/ui/core';
import { XCountdownComponent } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-down',
  imports: [XCardComponent, XCountdownComponent],
  templateUrl: './down.component.html',
  styleUrls: ['./down.component.scss']
})
export class ExDownComponent {
  deadline = signal(XAddDays(new Date(), 2).getTime());
}
