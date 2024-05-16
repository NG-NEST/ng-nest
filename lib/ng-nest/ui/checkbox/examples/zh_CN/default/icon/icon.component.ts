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
    { id: '微信', icon: 'ado-wechat' },
    { id: '钉钉', icon: 'ado-dingding' },
    { id: '微博', icon: 'ado-weibo' }
  ]);
  dataDisabled = signal<XCheckboxNode[]>([
    { id: 'QQ', icon: 'ado-qq' },
    { id: '微信', icon: 'ado-wechat' },
    { id: '钉钉', disabled: true, icon: 'ado-dingding' },
    { id: '微博', icon: 'ado-weibo' }
  ]);
  model = signal(['钉钉']);
}
