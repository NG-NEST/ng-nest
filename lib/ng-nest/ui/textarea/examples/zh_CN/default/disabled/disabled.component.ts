import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal('输入框禁用');
  modelClearable = signal('禁用状态下，不显示清除按钮');
}
