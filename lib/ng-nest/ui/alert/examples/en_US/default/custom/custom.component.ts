import { Component } from '@angular/core';
import { XAddSeconds } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  deadline = XAddSeconds(new Date(), 10).getTime();
  close() {
    console.log('Close the event');
  }
}
