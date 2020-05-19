import { Component } from '@angular/core';
import {
  XControl,
  XInputControl,
  XSelectControl,
  XCascadeControl,
  XColorPickerControl,
  XDatePickerControl,
  XInputNumberControl,
  XRadioControl,
  XRateControl,
  XSwitchControl,
  XTimePickerControl,
  XSliderSelectControl,
  XCheckboxControl,
  XFormRow
} from '@ng-nest/ui/form';
import { XData } from '@ng-nest/ui/core';
import { XCalendarNode } from '@ng-nest/ui/calendar';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XSelectNode } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';

const DATA_CASCADE: XData<XCalendarNode> = [
  { id: 1, label: 'AAAA' },
  { id: 2, label: 'BBBB' },
  { id: 3, label: 'CCCC' },
  { id: 4, label: 'DDDD' },
  { id: 5, label: 'AAAA-1', pid: 1 },
  { id: 6, label: 'AAAA-2', pid: 1 },
  { id: 7, label: 'AAAA-3', pid: 1 },
  { id: 8, label: 'AAAA-4', pid: 1 },
  { id: 9, label: 'BBBB-1', pid: 2 },
  { id: 10, label: 'BBBB-2', pid: 2 },
  { id: 11, label: 'BBBB-3', pid: 2 },
  { id: 12, label: 'BBBB-4', pid: 2 },
  { id: 13, label: 'CCCC-1', pid: 3 },
  { id: 14, label: 'CCCC-2', pid: 3 },
  { id: 15, label: 'CCCC-3', pid: 3 },
  { id: 16, label: 'CCCC-4', pid: 3 },
  { id: 17, label: 'DDDD-1', pid: 4 },
  { id: 18, label: 'DDDD-2', pid: 4 },
  { id: 19, label: 'DDDD-3', pid: 4 },
  { id: 20, label: 'DDDD-4', pid: 4 },
  { id: 21, label: 'AAAA-1-1', pid: 5 },
  { id: 22, label: 'AAAA-1-2', pid: 5 },
  { id: 23, label: 'AAAA-1-3', pid: 5 },
  { id: 24, label: 'AAAA-1-4', pid: 5 },
  { id: 25, label: 'AAAA-2-1', pid: 6 },
  { id: 26, label: 'AAAA-2-2', pid: 6 },
  { id: 27, label: 'AAAA-2-3', pid: 6 },
  { id: 28, label: 'AAAA-2-4', pid: 6 },
  { id: 29, label: 'AAAA-3-1', pid: 7 },
  { id: 30, label: 'AAAA-3-2', pid: 7 },
  { id: 31, label: 'AAAA-3-3', pid: 7 },
  { id: 32, label: 'AAAA-3-4', pid: 7 },
  { id: 33, label: 'AAAA-4-1', pid: 8 },
  { id: 34, label: 'AAAA-4-2', pid: 8 },
  { id: 35, label: 'AAAA-4-3', pid: 8 },
  { id: 36, label: 'AAAA-4-4', pid: 8 }
];

const DATA_CHECKBOX: XData<XCheckboxNode> = ['QQ', '微信', '钉钉', '微博'];

const DATA_SELECT: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  controls: XFormRow[] = [
    {
      title: 'Cascade 级联选择器',
      icon: 'fto-list',
      controls: [
        new XCascadeControl({ id: 'cascade', label: '默认', span: 8, data: DATA_CASCADE }),
        new XCascadeControl({ id: 'cascadeDisabled', label: '禁用', span: 8, data: DATA_CASCADE, value: 22, disabled: true }),
        new XCascadeControl({ id: 'cascadeRequired', label: '必填', span: 8, data: DATA_CASCADE, required: true }),
        new XCascadeControl({ id: 'cascadePlaceholder', label: '提示选择', span: 8, data: DATA_CASCADE, placeholder: '请选择城市' })
      ]
    },
    {
      controls: [new XCascadeControl({ id: 'cascadeRow', label: '标签位置', direction: 'row', span: 8, data: DATA_CASCADE })]
    },
    {
      title: 'Checkbox 多选框',
      icon: 'fto-list',
      controls: [
        new XCheckboxControl({ id: 'checkbox', label: '默认', span: 8, data: DATA_CHECKBOX }),
        new XCheckboxControl({
          id: 'checkboxDisabled',
          label: '禁用',
          span: 8,
          data: DATA_CHECKBOX,
          value: ['QQ', '钉钉'],
          disabled: true
        }),
        new XCheckboxControl({ id: 'checkboxRequired', label: '必选', span: 8, data: DATA_CHECKBOX, required: true }),
        new XCheckboxControl({ id: 'checkboxButton', label: '按钮样式', span: 8, data: DATA_CHECKBOX, button: true }),
        new XCheckboxControl({
          id: 'checkboxButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: ['QQ', '钉钉'],
          disabled: true
        }),
        new XCheckboxControl({
          id: 'checkboxButtonRequired',
          label: '按钮必选',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        })
      ]
    },
    {
      title: 'ColorPicker 颜色选择器',
      icon: 'fto-list',
      controls: [
        new XColorPickerControl({ id: 'colorPicker', label: '默认', span: 8 }),
        new XColorPickerControl({ id: 'colorPickerDisabled', label: '禁用', span: 8, value: '#1976d2', disabled: true }),
        new XColorPickerControl({ id: 'colorPickerRequired', label: '必填', span: 8, required: true }),
        new XColorPickerControl({ id: 'colorPickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择颜色' })
      ]
    },
    {
      title: 'DatePicker 日期选择器',
      icon: 'fto-list',
      controls: [
        new XDatePickerControl({ id: 'datePicker', label: '默认', span: 8 }),
        new XDatePickerControl({ id: 'datePickerDisabled', label: '禁用', span: 8, value: '2020-05-19', disabled: true }),
        new XDatePickerControl({ id: 'datePickerRequired', label: '必填', span: 8, required: true }),
        new XDatePickerControl({ id: 'datePickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择日期' }),
        new XDatePickerControl({ id: 'datePickerYear', label: '选年', span: 8, type: 'year' }),
        new XDatePickerControl({ id: 'datePickerMonth', label: '选月', span: 8, type: 'month' })
      ]
    },
    {
      title: 'InputNumber 计数器',
      icon: 'fto-list',
      controls: [
        new XInputNumberControl({ id: 'inputNumber', label: '默认', span: 8 }),
        new XInputNumberControl({ id: 'inputNumberDisabled', label: '禁用', span: 8, value: 20, disabled: true }),
        new XInputNumberControl({ id: 'inputNumberRequired', label: '必填', span: 8, required: true }),
        new XInputNumberControl({ id: 'inputNumberMinMax', label: '限制大小( -10 至 10 )', span: 8, min: -10, max: 10 }),
        new XInputNumberControl({ id: 'inputNumberPrecision', label: '精度', span: 8, precision: 2, step: 0.1 })
      ]
    },
    {
      title: 'Input 输入框',
      icon: 'fto-list',
      controls: [
        new XInputControl({ id: 'input', label: '默认', span: 8 }),
        new XInputControl({ id: 'inputDisabled', label: '禁用', span: 8, value: 'ngnest.com', disabled: true }),
        new XInputControl({ id: 'inputRequired', label: '必填', span: 8, required: true }),
        new XInputControl({
          id: 'inputRequired',
          label: '必填+正则验证',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?\d+$/,
          message: '整数'
        }),
        new XInputControl({ id: 'inputPlaceholder', label: '提示输入', span: 8, placeholder: '请输入用户名' }),
        new XInputControl({ id: 'inputClearable', label: '清除按钮', span: 8, value: '清除按钮', clearable: true }),
        new XInputControl({ id: 'inputIcon', label: '图标', span: 8, icon: 'fto-user' }),
        new XInputControl({ id: 'inputLength', label: '长度限制', span: 8, maxlength: 10 })
      ]
    },
    {
      controls: [new XInputControl({ id: 'inputRow', label: '标签位置', direction: 'row', span: 8 })]
    },
    {
      title: 'Radio 单选框',
      icon: 'fto-list',
      controls: [
        new XRadioControl({ id: 'radio', label: '默认', span: 8, data: DATA_CHECKBOX }),
        new XRadioControl({ id: 'radioDisabled', label: '禁用', span: 8, data: DATA_CHECKBOX, value: 'QQ', disabled: true }),
        new XRadioControl({ id: 'radioRequired', label: '必选', span: 8, data: DATA_CHECKBOX, required: true }),
        new XRadioControl({ id: 'radioButton', label: '按钮样式', span: 8, data: DATA_CHECKBOX, button: true }),
        new XRadioControl({
          id: 'radioButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: 'QQ',
          disabled: true
        }),
        new XRadioControl({ id: 'radioButtonRequired', label: '按钮必选', span: 8, data: DATA_CHECKBOX, button: true, required: true })
      ]
    },
    {
      title: 'Rate 评分',
      icon: 'fto-list',
      controls: [
        new XRateControl({ id: 'rate', label: '默认', span: 8 }),
        new XRateControl({ id: 'rateDisabled', label: '禁用', span: 8, value: 4, disabled: true }),
        new XRateControl({ id: 'rateRequired', label: '必选', span: 8, required: true })
      ]
    },
    {
      title: 'Select 选择器',
      icon: 'fto-list',
      controls: [
        new XSelectControl({ id: 'select', label: '默认', span: 8, data: DATA_SELECT }),
        new XSelectControl({ id: 'selectDisabled', label: '禁用', span: 8, data: DATA_SELECT, value: 'BBBB', disabled: true }),
        new XSelectControl({ id: 'selectRequired', label: '必填', span: 8, data: DATA_SELECT, required: true }),
        new XSelectControl({ id: 'selectPlaceholder', label: '提示选择', span: 8, data: DATA_SELECT, placeholder: '请选择城市' }),
        new XSelectControl({
          id: 'selectAsync',
          label: '异步获取数据',
          span: 8,
          data: new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(DATA_SELECT as string[]);
              x.complete();
            }, 2000);
          }),
          async: true
        })
      ]
    },
    {
      title: 'SliderSelect 滑动选择',
      icon: 'fto-list',
      controls: [
        new XSliderSelectControl({ id: 'sliderSelect', label: '默认', span: 8 }),
        new XSliderSelectControl({ id: 'sliderSelectDisabled', label: '禁用', span: 8, value: 50, disabled: true }),
        new XSliderSelectControl({ id: 'sliderSelectRequired', label: '必选', span: 8, required: true }),
        new XSliderSelectControl({ id: 'sliderSelectMinMax', label: '限制', span: 8, value: 0, min: -10, max: 10 }),
        new XSliderSelectControl({ id: 'sliderSelectStep', label: '精度', span: 8, value: 0, min: 0, max: 1, step: 0.01 })
      ]
    },
    {
      title: 'Switch 开关',
      icon: 'fto-list',
      controls: [
        new XSwitchControl({ id: 'switch', label: '默认', span: 8 }),
        new XSwitchControl({ id: 'switchDisabled', label: '禁用', span: 8, value: true, disabled: true })
      ]
    },
    {
      title: 'TimePicker 时间选择器',
      icon: 'fto-list',
      controls: [
        new XTimePickerControl({ id: 'timePicker', label: '默认', span: 8 }),
        new XTimePickerControl({ id: 'timePickerDisabled', label: '禁用', span: 8, value: new Date(), disabled: true }),
        new XTimePickerControl({ id: 'timePickerRequired', label: '必填', span: 8, required: true })
      ]
    }
  ];
}
