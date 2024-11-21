import { Component, signal } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-type',
  imports: [XTimelineComponent, XCardComponent],
  templateUrl: './type.component.html'
})
export class ExTypeComponent {
  now = signal(new Date());
  data = signal<XTimelineNode[]>([
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      time: XAddDays(this.now(), -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      time: XAddDays(this.now(), -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      time: XAddDays(this.now(), -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      time: XAddHours(this.now(), -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      time: XAddHours(this.now(), -6)
    }
  ]);
}
