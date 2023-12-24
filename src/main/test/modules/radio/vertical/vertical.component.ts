import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XRadioNode } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class ExVerticalComponent {
  data: XData<XRadioNode> = ['QQ', '微信', '钉钉', '微博'];
}
