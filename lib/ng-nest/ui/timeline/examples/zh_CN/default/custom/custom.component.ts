import { Component } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XTimelineComponent, XCardComponent, XTimeAgoPipe],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      time: XAddHours(this.now, -6)
    }
  ];
}
