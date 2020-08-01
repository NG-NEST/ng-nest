import { Component } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data: XData<XRadioNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  model = 'WeChat';
}
