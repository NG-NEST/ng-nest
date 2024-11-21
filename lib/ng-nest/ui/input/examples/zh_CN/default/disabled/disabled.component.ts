import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XInputComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal('输入框禁用');
  modelClearable = signal('禁用状态下，不显示清除按钮');
}
