import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data: XData<XCheckboxNode> = ['QQ', '微信', '钉钉', '微博'];
  dataDisabled: XData<XCheckboxNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
}
