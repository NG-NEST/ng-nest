import { Component } from '@angular/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-button',
  standalone: true,
  imports: [FormsModule, XRadioComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent {
  data: XData<XRadioNode> = ['QQ', '微信', '钉钉', '微博'];
  dataDisabled: XData<XRadioNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = '钉钉';
}
