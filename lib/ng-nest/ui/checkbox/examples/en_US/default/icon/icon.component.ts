import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {
  data = signal<XCheckboxNode[]>([
    { id: 'QQ', icon: 'ado-qq' },
    { id: 'WeChat', icon: 'ado-wechat' },
    { id: 'DingTalk', icon: 'ado-dingding' },
    { id: 'Weibo', icon: 'ado-weibo' }
  ]);
  dataDisabled = signal<XCheckboxNode[]>([
    { id: 'QQ', icon: 'ado-qq' },
    { id: 'WeChat', icon: 'ado-wechat' },
    { id: 'DingTalk', disabled: true, icon: 'ado-dingding' },
    { id: 'Weibo', icon: 'ado-weibo' }
  ]);
  model = signal(['DingTalk']);
}
