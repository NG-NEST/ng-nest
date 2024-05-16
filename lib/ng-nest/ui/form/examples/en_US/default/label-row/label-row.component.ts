import { Component, signal } from '@angular/core';
import { XControl, XFormComponent } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-label-row',
  standalone: true,
  imports: [XFormComponent],
  templateUrl: './label-row.component.html'
})
export class ExLabelRowComponent {
  controls = signal<XControl[]>([
    {
      control: 'input',
      id: 'id',
      label: 'code',
      maxlength: 10,
      required: true,
      value: 909090
    },
    {
      control: 'input',
      id: 'name',
      label: 'name',
      disabled: true
    },
    {
      control: 'input',
      id: 'account',
      label: 'user',
      clearable: true,
      required: true,
      pattern: [/^-?\d+$/, /^[+]{0,1}(\d+)$/],
      message: ['integer', 'positive integer'],
      clearClick: (_value: any) => {}
    },
    {
      control: 'input',
      id: 'password',
      label: 'password'
    },
    {
      control: 'input',
      id: 'file',
      label: 'file'
    },
    {
      control: 'select',
      id: 'type',
      label: 'role',
      data: ['ordinary user', 'administrator', 'sales'],
      value: 'administrator'
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
      ]
    },
    { control: 'color-picker', id: 'color', label: 'like color' },
    {
      control: 'color-picker',
      id: 'createDate',
      label: 'creation date'
    },
    { control: 'input-number', id: 'age', label: 'age' },
    { control: 'radio', id: 'gender', label: 'gender', data: ['man', 'women'] },
    {
      control: 'rate',
      id: 'level',
      label: 'level',
      count: 6
    },
    {
      control: 'switch',
      id: 'disabled',
      label: 'disabled'
    },
    {
      control: 'time-picker',
      id: 'time',
      label: 'time'
    },
    {
      control: 'slider-select',
      id: 'process',
      label: 'process'
    },
    {
      control: 'checkbox',
      id: 'hobby',
      label: 'hobby',
      data: ['table tennis', 'basketball', 'football']
    }
  ]);
}
