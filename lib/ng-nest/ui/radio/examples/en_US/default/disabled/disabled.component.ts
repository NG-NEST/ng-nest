import { Component } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data: XData<XRadioNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XRadioNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = 'DingTalk';
}
