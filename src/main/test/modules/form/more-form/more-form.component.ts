import { Component, ViewChild } from '@angular/core';
import { XFormComponent, XFormRow } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-more-form',
  templateUrl: './more-form.component.html',
  providers: []
})
export class ExMoreFormComponent {
  constructor() {}

  @ViewChild('formOne') formOne!: XFormComponent;
  @ViewChild('formTwo') formTwo!: XFormComponent;

  controls: XFormRow[] = [
    {
      title: 'Input 输入框',
      icon: 'fto-list',
      controls: [
        {
          control: 'input',
          id: 'input',
          label: '默认',
          span: 8
        },
        {
          control: 'input',
          id: 'inputDisabled',
          label: '禁用',
          span: 8,
          value: 'ngnest.com',
          disabled: true
        },
        {
          control: 'input',
          id: 'inputRequired',
          label: '必填',
          span: 8,
          required: true
        },
        {
          control: 'input',
          id: 'inputRequired',
          label: '必填+正则验证',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?d+$/,
          message: '整数'
        },
        {
          control: 'input',
          id: 'inputPlaceholder',
          label: '提示输入',
          span: 8,
          placeholder: '请输入用户名'
        },
        {
          control: 'input',
          id: 'inputClearable',
          label: '清除按钮',
          span: 8,
          value: '清除按钮',
          clearable: true
        },
        {
          control: 'input',
          id: 'inputIcon',
          label: '图标',
          span: 8,
          icon: 'fto-user'
        },
        {
          control: 'input',
          id: 'inputLength',
          label: '长度限制',
          span: 8,
          maxlength: 10
        }
      ]
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      // this.formOne.formGroup.reset();
      // this.formTwo.formGroup.reset();
    }, 3000);
  }
}
