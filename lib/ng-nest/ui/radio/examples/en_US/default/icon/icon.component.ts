import { Component, signal } from '@angular/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [FormsModule, XRadioComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {
  data = signal<XRadioNode[]>([
    { label: 'QQ', icon: 'ado-qq' },
    { label: 'WeChat', icon: 'ado-wechat' },
    { label: 'DingTalk', icon: 'ado-dingding' },
    { label: 'Weibo', icon: 'ado-weibo' }
  ]);
  dataDisabled = signal<XRadioNode[]>([
    { label: 'QQ', icon: 'ado-qq' },
    { label: 'WeChat', icon: 'ado-wechat' },
    { label: 'DingTalk', disabled: true, icon: 'ado-dingding' },
    { label: 'Weibo', icon: 'ado-weibo' }
  ]);
  model = signal('DingTalk');
}
