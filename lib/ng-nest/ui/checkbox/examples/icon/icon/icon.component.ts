import { Component, OnInit } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent implements OnInit {
  data: XData<XCheckboxNode[]> = [
    { value: 'QQ', icon: 'ado-qq' },
    { value: '微信', icon: 'ado-wechat' },
    { value: '钉钉', icon: 'ado-dingding' },
    { value: '微博', icon: 'ado-weibo' }
  ];
  dataDisabled: XData<XCheckboxNode[]> = [
    { value: 'QQ', icon: 'ado-qq' },
    { value: '微信', icon: 'ado-wechat' },
    { value: '钉钉', disabled: true, icon: 'ado-dingding' },
    { value: '微博', icon: 'ado-weibo' }
  ];
  model = ['钉钉'];
  constructor() {}

  ngOnInit() {}
}
