import { Component, signal } from '@angular/core';
import { XTimelineComponent, XTimelineMode, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';

@Component({
  selector: 'ex-mode',
  imports: [FormsModule, XTimelineComponent, XRadioComponent, XTimeAgoPipe],
  templateUrl: './mode.component.html'
})
export class ExModeComponent {
  modeData = signal(['left', 'right', 'alternate']);
  mode = signal<XTimelineMode>('left');
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
