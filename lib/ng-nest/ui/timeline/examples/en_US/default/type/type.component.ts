import { Component } from '@angular/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-type',
  templateUrl: './type.component.html'
})
export class ExTypeComponent {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: 'Add leave',
      content: 'Li San leave time 2020-2-23 to 2020-3-1',
      type: 'primary',
      time: XAddDays(this.now, -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si approved',
      type: 'success',
      time: XAddDays(this.now, -2)
    },
    {
      label: 'Applicant cancellation',
      content: 'Li San Leave off',
      type: 'warning',
      time: XAddDays(this.now, -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing passed the review',
      type: 'danger',
      time: XAddHours(this.now, -12)
    },
    {
      label: 'End',
      content: '',
      type: 'info',
      time: XAddHours(this.now, -6)
    }
  ];
}
