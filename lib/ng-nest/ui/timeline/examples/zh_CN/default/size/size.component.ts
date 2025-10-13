import { Component, signal } from '@angular/core';
import { XTimelineComponent, XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours, XSize } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XTimelineComponent, XRadioComponent],
  templateUrl: './size.component.html'
})
export class ExSizeComponent {
  now = signal(new Date());
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
  data = signal<XTimelineNode[]>([
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      icon: 'fto-user',
      time: XAddDays(this.now(), -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      icon: 'fto-user',
      time: XAddDays(this.now(), -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      icon: 'fto-user',
      time: XAddDays(this.now(), -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      icon: 'fto-user',
      time: XAddHours(this.now(), -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      icon: 'fto-user',
      time: XAddHours(this.now(), -6)
    }
  ]);
}
