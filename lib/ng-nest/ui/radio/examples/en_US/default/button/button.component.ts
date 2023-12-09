import { Component } from '@angular/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-button',
  standalone: true,
  imports: [FormsModule, XRadioComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent {
  data: XData<XRadioNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XRadioNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = 'DingTalk';
}
