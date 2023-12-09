import { Component } from '@angular/core';
import { XTimeRangePipe } from '@ng-nest/ui/time-range';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTimeRangePipe],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  diff = 1000 * 60 * 60 * 24 * 2 - 1000 * 30;
}
