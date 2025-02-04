import { Component, signal } from '@angular/core';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XAddSeconds } from '@ng-nest/ui/core';
import { XCountdownComponent } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-custom',
  imports: [XAlertComponent, XCountdownComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  deadline = signal(XAddSeconds(new Date(), 20).getTime());

  close() {
    console.log('closed');
  }
}
