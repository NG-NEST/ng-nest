import { Component, signal } from '@angular/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XRadioComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  model = signal('WeChat');
}
