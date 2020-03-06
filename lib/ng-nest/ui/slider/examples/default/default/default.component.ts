import { Component, OnInit } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  data: XData<XSliderNode[]> = [
    { id: 1, label: '栅格' },
    { id: 2, label: '代码高亮' },
    { id: 3, label: 'SVG图标' },
    { id: 4, label: '滑块' }
  ];
  constructor() {}

  ngOnInit() {}
}
