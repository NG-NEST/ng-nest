import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-vertical',
  standalone: true,
  imports: [XRadioComponent],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class ExVerticalComponent {
  data: XData<XRadioNode> = ['QQ', '微信', '钉钉', '微博'];
}
