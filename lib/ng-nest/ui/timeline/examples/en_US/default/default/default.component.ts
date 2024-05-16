import { Component, signal } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTimelineComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  now = signal(new Date());
  data = signal<XTimelineNode[]>([
    {
      label: 'Add leave',
      content: 'Li San leave time 2020-2-23 to 2020-3-1',
      time: XAddDays(this.now(), -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si approved',
      time: XAddDays(this.now(), -2)
    },
    {
      label: 'Applicant cancellation',
      content: 'Li San Leave off',
      time: XAddDays(this.now(), -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing passed the review',
      time: XAddHours(this.now(), -12)
    },
    {
      label: 'End',
      content: '',
      time: XAddHours(this.now(), -6)
    }
  ]);
}
