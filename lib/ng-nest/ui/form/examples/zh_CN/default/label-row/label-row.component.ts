import { Component, signal } from '@angular/core';
import { XControl, XFormComponent } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-label-row',
  imports: [XFormComponent],
  templateUrl: './label-row.component.html'
})
export class ExLabelRowComponent {
  controls = signal<XControl[]>([
    {
      control: 'input',
      id: 'id',
      label: '编码',
      maxlength: 10,
      required: true,
      value: 909090
    },
    {
      control: 'input',
      id: 'name',
      label: '姓名',
      disabled: true
    },
    {
      control: 'input',
      id: 'account',
      label: '账号',
      clearable: true,
      required: true,
      pattern: [/^-?\d+$/, /^[+]{0,1}(\d+)$/],
      message: ['整数', '正整数'],
      clearClick: (_value: any) => {}
    },
    {
      control: 'input',
      id: 'password',
      label: '密码'
    },
    {
      control: 'input',
      id: 'file',
      label: '文件'
    },
    {
      control: 'select',
      id: 'type',
      label: '角色',
      data: ['普通用户', '管理员', '销售'],
      value: '管理员'
    },
    {
      control: 'cascade',
      id: 'city',
      label: '城市',
      data: [
        { id: 1, label: '湖北省' },
        { id: 2, label: '浙江省' },
        { id: 3, label: '河南省' },
        { id: 4, label: '河北省' },
        { id: 5, pid: 1, label: '武汉市' },
        { id: 6, pid: 1, label: '宜昌市' },
        { id: 7, pid: 1, label: '荆州市' }
      ]
    },
    { control: 'color-picker', id: 'color', label: '喜欢颜色' },
    {
      control: 'color-picker',
      id: 'createDate',
      label: '创建日期'
    },
    { control: 'input-number', id: 'age', label: '年龄' },
    { control: 'radio', id: 'gender', label: '性别', data: ['男', '女'] },
    {
      control: 'rate',
      id: 'level',
      label: '级别',
      count: 6
    },
    {
      control: 'switch',
      id: 'disabled',
      label: '禁用'
    },
    {
      control: 'time-picker',
      id: 'time',
      label: '时间'
    },
    {
      control: 'slider-select',
      id: 'process',
      label: '进度'
    },
    {
      control: 'checkbox',
      id: 'active',
      label: '爱好',
      data: ['乒乓球', '篮球', '足球']
    }
  ]);
}
