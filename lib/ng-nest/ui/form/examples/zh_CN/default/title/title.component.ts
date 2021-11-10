import { Component } from '@angular/core';
import { XControl } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-title',
  templateUrl: './title.component.html'
})
export class ExTitleComponent {
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '姓名', required: true, maxlength: 10 },
    { control: 'input', id: 'id', label: '编码', disabled: true, value: '001001001', required: true },
    {
      control: 'input',
      id: 'account',
      label: '账号',
      clearable: true,
      clearClick: (_value: any) => {},
      required: true
    },
    { control: 'input', id: 'password', label: '密码', type: 'password', required: true },
    { control: 'input', id: 'file', label: '文件', required: true },
    { control: 'select', id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员', required: true },
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
      ],
      required: true
    },
    { control: 'color-picker', id: 'color', label: '喜欢颜色', required: true },
    { control: 'date-picker', id: 'createDate', label: '创建日期', required: true },
    { control: 'input-number', id: 'age', label: '年龄', required: true },
    { control: 'radio', id: 'gender', label: '性别', data: ['男', '女'], required: true },
    { control: 'rate', id: 'level', label: '级别', count: 6, required: true },
    { control: 'switch', id: 'disabled', label: '禁用' },
    { control: 'time-picker', id: 'time', label: '时间', required: true },
    { control: 'slider-select', id: 'process', label: '进度', required: true },
    { control: 'checkbox', id: 'active', label: '爱好', data: ['乒乓球', '篮球', '足球'], required: true }
  ];
}
