import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  dataDisabled = signal(['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo']);
  model = signal(['DingTalk']);
}
