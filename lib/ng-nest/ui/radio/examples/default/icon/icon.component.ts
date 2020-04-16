import { Component, OnInit } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent implements OnInit {
  data: XData<XRadioNode> = [
    { label: 'QQ', icon: 'ado-qq' },
    { label: '微信', icon: 'ado-wechat' },
    { label: '钉钉', icon: 'ado-dingding' },
    { label: '微博', icon: 'ado-weibo' }
  ];
  dataDisabled: XData<XRadioNode> = [
    { label: 'QQ', icon: 'ado-qq' },
    { label: '微信', icon: 'ado-wechat' },
    { label: '钉钉', disabled: true, icon: 'ado-dingding' },
    { label: '微博', icon: 'ado-weibo' }
  ];
  model = '钉钉';
  constructor() {}

  ngOnInit() {}
}
