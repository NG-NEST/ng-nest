import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data: XData<XCheckboxNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XCheckboxNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = ['DingTalk'];
}
