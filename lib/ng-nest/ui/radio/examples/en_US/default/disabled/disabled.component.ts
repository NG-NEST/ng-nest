import { Component, signal } from '@angular/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XRadioComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  dataDisabled = signal(['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo']);
  model = signal('DingTalk');
}
