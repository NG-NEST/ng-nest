import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './form.component';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormModule } from '@ng-nest/ui/form';
import { XFormPrefix, XControl, XFormRow } from './form.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XData } from '@ng-nest/ui/core';
import { XCalendarNode } from '@ng-nest/ui/calendar';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XSelectNode } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';
import { XButtonModule } from '@ng-nest/ui/button';

describe(XFormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XButtonModule, XFormModule],
      declarations: [TestXFormComponent, TestXFormRowComponent, TestXFormTitleComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXFormComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`row`, () => {
    let fixture: ComponentFixture<TestXFormRowComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormRowComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`title`, () => {
    let fixture: ComponentFixture<TestXFormTitleComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormTitleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

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
  selector: 'test-x-form',
  template: `<x-form [controls]="controls"></x-form>`
})
class TestXFormComponent {
  controls: XFormRow[] = [
    {
      title: 'Cascade 级联选择器',
      icon: 'fto-list',
      controls: [
        { id: 'cascade', control: 'cascade', label: '默认', span: 8, data: DATA_CASCADE },
        { id: 'cascadeDisabled', control: 'cascade', label: '禁用', span: 8, data: DATA_CASCADE, value: 22, disabled: true },
        { id: 'cascadeRequired', control: 'cascade', label: '必填', span: 8, data: DATA_CASCADE, required: true },
        { id: 'cascadePlaceholder', control: 'cascade', label: '提示选择', span: 8, data: DATA_CASCADE, placeholder: '请选择城市' }
      ]
    },
    {
      controls: [{ control: 'cascade', id: 'cascadeRow', label: '标签位置', direction: 'row', span: 8, data: DATA_CASCADE }]
    },
    {
      title: 'Checkbox 多选框',
      icon: 'fto-list',
      controls: [
        {
          control: 'checkbox',
          id: 'checkbox',
          label: '默认',
          span: 8,
          data: DATA_CHECKBOX
        },
        {
          control: 'checkbox',
          id: 'checkboxDisabled',
          label: '禁用',
          span: 8,
          data: DATA_CHECKBOX,
          value: ['QQ', '钉钉'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxRequired',
          label: '必选',
          span: 8,
          data: DATA_CHECKBOX,
          required: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButton',
          label: '按钮样式',
          span: 8,
          data: DATA_CHECKBOX,
          button: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: ['QQ', '钉钉'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonRequired',
          label: '按钮必选',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        }
      ]
    },
    {
      title: 'ColorPicker 颜色选择器',
      icon: 'fto-list',
      controls: [
        { control: 'color-picker', id: 'colorPicker', label: '默认', span: 8 },
        { control: 'color-picker', id: 'colorPickerDisabled', label: '禁用', span: 8, value: '#1976d2', disabled: true },
        { control: 'color-picker', id: 'colorPickerRequired', label: '必填', span: 8, required: true },
        { control: 'color-picker', id: 'colorPickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择颜色' }
      ]
    },
    {
      title: 'DatePicker 日期选择器',
      icon: 'fto-list',
      controls: [
        { control: 'date-picker', id: 'datePicker', label: '默认', span: 8 },
        { control: 'date-picker', id: 'datePickerDisabled', label: '禁用', span: 8, value: '2020-05-19', disabled: true },
        { control: 'date-picker', id: 'datePickerRequired', label: '必填', span: 8, required: true },
        { control: 'date-picker', id: 'datePickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择日期' },
        { control: 'date-picker', id: 'datePickerYear', label: '选年', span: 8, type: 'year' },
        { control: 'date-picker', id: 'datePickerMonth', label: '选月', span: 8, type: 'month' }
      ]
    },
    {
      title: 'InputNumber 计数器',
      icon: 'fto-list',
      controls: [
        { control: 'input-number', id: 'inputNumber', label: '默认', span: 8 },
        { control: 'input-number', id: 'inputNumberDisabled', label: '禁用', span: 8, value: 20, disabled: true },
        { control: 'input-number', id: 'inputNumberRequired', label: '必填', span: 8, required: true },
        { control: 'input-number', id: 'inputNumberMinMax', label: '限制大小( -10 至 10 )', span: 8, min: -10, max: 10 },
        { control: 'input-number', id: 'inputNumberPrecision', label: '精度', span: 8, precision: 2, step: 0.1 }
      ]
    },
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
          pattern: /^-?\d+$/,
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
    },
    {
      controls: [
        {
          control: 'input',
          id: 'inputRow',
          label: '标签位置',
          direction: 'row',
          span: 8
        }
      ]
    },
    {
      title: 'Radio 单选框',
      icon: 'fto-list',
      controls: [
        { control: 'radio', id: 'radio', label: '默认', span: 8, data: DATA_CHECKBOX },
        { control: 'radio', id: 'radioDisabled', label: '禁用', span: 8, data: DATA_CHECKBOX, value: 'QQ', disabled: true },
        { control: 'radio', id: 'radioRequired', label: '必选', span: 8, data: DATA_CHECKBOX, required: true },
        { control: 'radio', id: 'radioButton', label: '按钮样式', span: 8, data: DATA_CHECKBOX, button: true },
        {
          control: 'radio',
          id: 'radioButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: 'QQ',
          disabled: true
        },
        { control: 'radio', id: 'radioButtonRequired', label: '按钮必选', span: 8, data: DATA_CHECKBOX, button: true, required: true }
      ]
    },
    {
      title: 'Rate 评分',
      icon: 'fto-list',
      controls: [
        {
          control: 'rate',
          id: 'rate',
          label: '默认',
          span: 8
        },
        {
          control: 'rate',
          id: 'rateDisabled',
          label: '禁用',
          span: 8,
          value: 4,
          disabled: true
        },
        {
          control: 'rate',
          id: 'rateRequired',
          label: '必选',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Select 选择器',
      icon: 'fto-list',
      controls: [
        { control: 'select', id: 'select', label: '默认', span: 8, data: DATA_SELECT },
        { control: 'select', id: 'selectDisabled', label: '禁用', span: 8, data: DATA_SELECT, value: 'BBBB', disabled: true },
        { control: 'select', id: 'selectRequired', label: '必填', span: 8, data: DATA_SELECT, required: true },
        { control: 'select', id: 'selectPlaceholder', label: '提示选择', span: 8, data: DATA_SELECT, placeholder: '请选择城市' },
        {
          control: 'select',
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
        }
      ]
    },
    {
      title: 'SliderSelect 滑动选择',
      icon: 'fto-list',
      controls: [
        {
          control: 'slider-select',
          id: 'sliderSelect',
          label: '默认',
          span: 8
        },
        {
          control: 'slider-select',
          id: 'sliderSelectDisabled',
          label: '禁用',
          span: 8,
          value: 50,
          disabled: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectRequired',
          label: '必选',
          span: 8,
          required: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectMinMax',
          label: '限制',
          span: 8,
          value: 0,
          min: -10,
          max: 10
        },
        {
          control: 'slider-select',
          id: 'sliderSelectStep',
          label: '精度',
          span: 8,
          value: 0,
          min: 0,
          max: 1,
          step: 0.01
        }
      ]
    },
    {
      title: 'Switch 开关',
      icon: 'fto-list',
      controls: [
        {
          control: 'switch',
          id: 'switch',
          label: '默认',
          span: 8
        },
        {
          control: 'switch',
          id: 'switchDisabled',
          label: '禁用',
          span: 8,
          value: true,
          disabled: true
        }
      ]
    },
    {
      title: 'TimePicker 时间选择器',
      icon: 'fto-list',
      controls: [
        {
          control: 'time-picker',
          id: 'timePicker',
          label: '默认',
          span: 8
        },
        {
          control: 'time-picker',
          id: 'timePickerDisabled',
          label: '禁用',
          span: 8,
          value: new Date(),
          disabled: true
        },
        {
          control: 'time-picker',
          id: 'timePickerRequired',
          label: '必填',
          span: 8,
          required: true
        }
      ]
    }
  ];
}

@Component({
  selector: 'test-x-form-row',
  template: `<x-form
      #form
      [controls]="controls"
      direction="row"
      labelSuffix=":"
      width="28rem"
      labelWidth="8rem"
      labelAlign="end"
      span="20"
    ></x-form>
    <x-button (click)="submit()">提交</x-button><x-button (click)="getMessages()">获取验证信息</x-button>`
})
class TestXFormRowComponent {
  controls: XControl[] = [
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
      clearClick: (value: any) => {
        console.log(value);
      }
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
    { control: 'select', id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员' },
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
    { control: 'color-picker', id: 'color', label: '喜欢的颜色' },
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
  ];
  @ViewChild('form') form: XFormComponent;

  submit() {
    console.log(this.form);
  }

  getMessages() {
    console.log(this.form.getValidatorMessages());
  }
}

@Component({
  selector: 'test-x-form-title',
  template: `<x-form [controls]="controls" direction="row" span="8" space="1.5"></x-form>`
})
class TestXFormTitleComponent {
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '姓名', required: true, maxlength: 10 },
    { control: 'input', id: 'id', label: '编码', disabled: true, value: '001001001', required: true },
    {
      control: 'input',
      id: 'account',
      label: '账号',
      clearable: true,
      clearClick: (value: any) => {
        console.log(value);
      },
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
