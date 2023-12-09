import { Component } from '@angular/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XRadioComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data: XData<XRadioNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  model = 'WeChat';
}
