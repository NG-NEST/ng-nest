import { Component, signal } from '@angular/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-button',
  imports: [FormsModule, XRadioComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  dataDisabled = signal(['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo']);
  model = signal('DingTalk');
}
