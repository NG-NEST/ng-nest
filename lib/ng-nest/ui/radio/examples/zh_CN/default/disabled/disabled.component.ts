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
  data = signal(['QQ', '微信', '钉钉', '微博']);
  dataDisabled = signal(['QQ', '微信', { label: '钉钉', disabled: true }, '微博']);
  model = signal('钉钉');
}
