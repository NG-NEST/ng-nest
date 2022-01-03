import { Component } from '@angular/core';
import { XControl } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-title',
  templateUrl: './title.component.html'
})
export class ExTitleComponent {
  controls: XControl[] = [
    { control: 'input', id: 'name', label: 'name', required: true, maxlength: 10 },
    { control: 'input', id: 'id', label: 'code', disabled: true, value: '001001001', required: true },
    {
      control: 'input',
      id: 'account',
      label: 'user',
      clearable: true,
      clearClick: (_value: any) => {},
      required: true
    },
    { control: 'input', id: 'password', label: 'password', type: 'password', required: true },
    { control: 'input', id: 'file', label: 'file', required: true },
    {
      control: 'select',
      id: 'type',
      label: 'role',
      data: ['ordinary user', 'administrator', 'sales'],
      value: 'administrator',
      required: true
    },
    {
      control: 'cascade',
      id: 'city',
      label: 'city',
      data: [
        { id: 1, label: 'Hubei Province' },
        { id: 2, label: 'Zhejiang Province' },
        { id: 3, label: 'Henan Province' },
        { id: 4, label: 'Hebei Province' },
        { id: 5, pid: 1, label: 'Wuhan city' },
        { id: 6, pid: 1, label: 'Yichang city' },
        { id: 7, pid: 1, label: 'Jingzhou city' }
      ],
      required: true
    },
    { control: 'color-picker', id: 'color', label: 'like color', required: true },
    { control: 'date-picker', id: 'createDate', label: 'creation date', required: true },
    { control: 'input-number', id: 'age', label: 'age', required: true },
    { control: 'radio', id: 'gender', label: 'gender', data: ['men', 'women'], required: true },
    { control: 'rate', id: 'level', label: 'level', count: 6, required: true },
    { control: 'switch', id: 'disabled', label: 'disabled' },
    { control: 'time-picker', id: 'time', label: 'time', required: true },
    { control: 'slider-select', id: 'process', label: 'process', required: true },
    { control: 'checkbox', id: 'hobby', label: 'hobby', data: ['table tennis', 'basketball', 'football'], required: true }
  ];
}
