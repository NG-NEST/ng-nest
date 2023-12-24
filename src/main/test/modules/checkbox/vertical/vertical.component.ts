import { Component } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class ExVerticalComponent {
  data: XData<XCheckboxNode> = ['QQ', '微信', '钉钉', '微博'];
  model = ['微信'];
}
