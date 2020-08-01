import { Component } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data: XData<XCheckboxNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XCheckboxNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = ['DingTalk'];
}
