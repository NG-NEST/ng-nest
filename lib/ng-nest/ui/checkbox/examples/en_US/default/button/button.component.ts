import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-button',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  dataDisabled = signal(['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo']);
  model = signal(['DingTalk']);
}
