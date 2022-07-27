import { Component } from '@angular/core';
import { XTimelineMode, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-mode',
  templateUrl: './mode.component.html'
})
export class ExModeComponent {
  modeData = ['left', 'right', 'alternate'];
  mode: XTimelineMode = 'left';
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: 'Add leave',
      content: 'Li San leave time 2020-2-23 to 2020-3-1',
      time: XAddDays(this.now, -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si approved',
      time: XAddDays(this.now, -2)
    },
    {
      label: 'Applicant cancellation',
      content: 'Li San Leave off',
      time: XAddDays(this.now, -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing passed the review',
      time: XAddHours(this.now, -12)
    },
    {
      label: 'End',
      content: '',
      time: XAddHours(this.now, -6)
    }
  ];
}
