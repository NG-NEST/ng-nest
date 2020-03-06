import { Component, OnInit } from '@angular/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ExColorComponent implements OnInit {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      icon: 'fto-user',
      color: 'black',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      icon: 'fto-user',
      color: 'red',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      icon: 'fto-user',
      color: 'blue',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      icon: 'fto-user',
      color: 'rgba(51, 51, 51, 0.72)',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      icon: 'fto-user',
      color: '#ffff00',
      time: XAddHours(this.now, -6)
    }
  ];
  constructor() {}

  ngOnInit() {}
}
