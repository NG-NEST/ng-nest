import { Component } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-loading',
  standalone: true,
  imports: [XTimelineComponent],
  templateUrl: './loading.component.html'
})
export class ExLoadingComponent {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: 'Added a holiday',
      content: 'Li San, please 2020-2-23 to 2020-3-1',
      time: XAddDays(this.now, -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si is approved',
      time: XAddDays(this.now, -2)
    },
    {
      label: 'Applicant',
      content: 'Li Sanmou',
      time: XAddDays(this.now, -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing review',
      time: XAddHours(this.now, -12)
    },
    {
      label: 'Loading...',
      loading: true
    }
  ];
}