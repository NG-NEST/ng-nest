import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XFormControlOption, XFormModule } from '@ng-nest/ui/form';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [CommonModule, XFormModule, XButtonComponent, XDialogComponent, XIconComponent, XLinkComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  visibleTable!: boolean;
  visibleForm!: boolean;
  visibleCustom!: boolean;

  constructor() {}

  customTable() {
    this.visibleTable = true;
  }

  customForm() {
    this.visibleForm = true;
  }

  custom() {
    this.visibleCustom = true;
  }

  customClose() {
    this.visibleCustom = false;
  }

  controls: XFormControlOption[] = [
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
      id: 'inputRequiredPattern',
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
  ];
}
