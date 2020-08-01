import { Component } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent {
  data: XData<XRadioNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XRadioNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = 'DingTalk';
}
