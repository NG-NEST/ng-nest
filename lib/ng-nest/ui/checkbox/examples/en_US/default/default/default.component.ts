import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data = signal(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
  model = signal(['WeChat']);
}
