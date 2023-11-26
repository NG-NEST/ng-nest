import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent implements OnInit {
  data: XData<XCheckboxNode> = [
    { id: 'QQ', icon: 'ado-qq' },
    { id: 'WeChat', icon: 'ado-wechat' },
    { id: 'DingTalk', icon: 'ado-dingding' },
    { id: 'Weibo', icon: 'ado-weibo' }
  ];
  dataDisabled: XData<XCheckboxNode> = [
    { id: 'QQ', icon: 'ado-qq' },
    { id: 'WeChat', icon: 'ado-wechat' },
    { id: 'DingTalk', disabled: true, icon: 'ado-dingding' },
    { id: 'Weibo', icon: 'ado-weibo' }
  ];
  model = ['DingTalk'];
  constructor() {}

  ngOnInit() {}
}
