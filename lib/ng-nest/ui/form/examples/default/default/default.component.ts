import { Component } from '@angular/core';
import { XControl, XInputControl, XSelectControl } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  controls: XControl[] = [
    new XInputControl({ id: 'id', label: '编码', span: 6, maxlength: 10, required: true, value: 909090 }),
    new XInputControl({ id: 'name', label: '姓名', span: 6, disabled: true }),
    new XInputControl({
      id: 'account',
      label: '账号',
      span: 6,
      clearable: true,
      clear: (value: any) => {
        console.log(value);
      }
    }),
    new XInputControl({ id: 'password', label: '密码', span: 6 }),
    new XInputControl({ id: 'file', label: '文件', span: 6 }),
    new XSelectControl({ id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], span: 6 })
  ];
}
