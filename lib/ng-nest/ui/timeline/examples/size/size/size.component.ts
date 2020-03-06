import { Component, OnInit } from '@angular/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent implements OnInit {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      icon: 'fto-user',
      size: 'large',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      icon: 'fto-user',
      size: 'medium',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      icon: 'fto-user',
      size: 'small',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      icon: 'fto-user',
      size: 'mini',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      icon: 'fto-user',
      time: XAddHours(this.now, -6)
    }
  ];
  constructor() {}

  ngOnInit() {}
}
