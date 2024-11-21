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
  data = signal(['QQ', '微信', '钉钉', '微博']);
  model = signal('微信');
}
