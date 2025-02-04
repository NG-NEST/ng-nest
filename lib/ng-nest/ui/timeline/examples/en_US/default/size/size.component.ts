import { Component, signal } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-size',
  imports: [XTimelineComponent],
  templateUrl: './size.component.html'
})
export class ExSizeComponent {
  now = signal(new Date());
  data = signal<XTimelineNode[]>([
    {
      label: 'Add leave',
      content: 'Li San leave time 2020-2-23 to 2020-3-1',
      type: 'primary',
      icon: 'fto-user',
      size: 'large',
      time: XAddDays(this.now(), -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si approved',
      type: 'success',
      icon: 'fto-user',
      size: 'medium',
      time: XAddDays(this.now(), -2)
    },
    {
      label: 'Applicant cancellation',
      content: 'Li San Leave off',
      type: 'warning',
      icon: 'fto-user',
      size: 'small',
      time: XAddDays(this.now(), -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing passed the review',
      type: 'danger',
      icon: 'fto-user',
      size: 'mini',
      time: XAddHours(this.now(), -12)
    },
    {
      label: 'End',
      content: '',
      type: 'info',
      icon: 'fto-user',
      time: XAddHours(this.now(), -6)
    }
  ]);
}
