import { Component } from '@angular/core';
import { XControl } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-other',
  templateUrl: './other.component.html'
})
export class ExOtherComponent {
  controls: XControl[] = [
    {
      control: 'select',
      id: 'type',
      label: '角色',
      multiple: true,
      disabled: true,
      data: ['普通用户', '管理员', '销售', 'AAAA', 'BBBB', 'CCCC', 'DDDD', 'FFFF'],
      value: ['管理员', 'CCCC', 'DDDD', 'FFFF']
    }
  ];
}
