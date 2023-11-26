import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data: XData<XCheckboxNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  model = ['WeChat'];
}
