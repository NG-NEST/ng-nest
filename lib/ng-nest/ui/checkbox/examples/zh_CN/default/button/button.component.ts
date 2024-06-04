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
  data = signal(['QQ', '微信', '钉钉', '微博']);
  dataDisabled = signal(['QQ', '微信', { label: '钉钉', disabled: true }, '微博']);
  model = signal(['钉钉']);
}
