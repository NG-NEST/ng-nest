import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './form.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormModule } from '@ng-nest/ui/form';
import {
  XFormPrefix,
  XControl,
  XInputControl,
  XSelectControl,
  XCascadeControl,
  XCheckboxControl,
  XColorPickerControl,
  XDatePickerControl,
  XInputNumberControl,
  XRadioControl,
  XRateControl,
  XSliderSelectControl,
  XSwitchControl,
  XTimePickerControl,
  XFormRow
} from './form.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XData } from '@ng-nest/ui/core';
import { XCalendarNode } from '@ng-nest/ui/calendar';
import { XCheckboxNode } from '../checkbox';

describe(XFormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XFormModule],
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

@Component({
  selector: 'test-x-form',
  template: `<x-form [controls]="controls"></x-form>`
})
class TestXFormComponent {
  controls: XFormRow[] = [
    {
      title: '级联选择器',
      icon: 'fto-list',
      controls: [
        new XCascadeControl({
          id: 'cascade',
          label: '默认',
          span: 8,
          data: DATA_CASCADE
        }),
        new XCascadeControl({
          id: 'cascadeDisabled',
          label: '禁用',
          span: 8,
          data: DATA_CASCADE,
          value: 22,
          disabled: true
        }),
        new XCascadeControl({
          id: 'cascadeRequired',
          label: '必填',
          span: 8,
          data: DATA_CASCADE,
          required: true
        }),
        new XCascadeControl({
          id: 'cascadePlaceholder',
          label: '提示选择',
          span: 8,
          data: DATA_CASCADE,
          placeholder: '请选择城市'
        })
      ]
    },
    {
      controls: [
        new XCascadeControl({
          id: 'cascadeRow',
          label: '标签位置',
          direction: 'row',
          span: 8,
          data: DATA_CASCADE
        })
      ]
    },
    {
      title: '多选框',
      icon: 'fto-list',
      controls: [
        new XCheckboxControl({
          id: 'checkbox',
          label: '默认',
          span: 8,
          data: DATA_CHECKBOX
        })
      ]
    },
    {
      title: '输入框',
      icon: 'fto-list',
      controls: [
        new XInputControl({
          id: 'input',
          label: '默认',
          span: 8
        }),
        new XInputControl({
          id: 'inputDisabled',
          label: '禁用',
          span: 8,
          value: 'ngnest.com',
          disabled: true
        }),
        new XInputControl({
          id: 'inputRequired',
          label: '必填',
          span: 8,
          required: true
        }),
        new XInputControl({
          id: 'inputRequired',
          label: '必填+正则验证',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?\d+$/,
          message: '整数'
        }),
        new XInputControl({
          id: 'inputPlaceholder',
          label: '提示输入',
          span: 8,
          placeholder: '请输入用户名'
        }),
        new XInputControl({
          id: 'inputClearable',
          label: '清除按钮',
          span: 8,
          value: '清除按钮',
          clearable: true
        }),
        new XInputControl({
          id: 'inputIcon',
          label: '图标',
          span: 8,
          icon: 'fto-user'
        }),
        new XInputControl({
          id: 'inputLength',
          label: '长度限制',
          span: 8,
          maxlength: 10
        })
      ]
    },
    {
      controls: [
        new XInputControl({
          id: 'inputRow',
          label: '标签位置',
          direction: 'row',
          span: 8
        })
      ]
    }
  ];
}

@Component({
  selector: 'test-x-form-row',
  template: `<x-form
    [controls]="controls"
    direction="row"
    label-suffix=":"
    width="28rem"
    label-width="8rem"
    label-align="end"
    span="20"
  ></x-form>`
})
class TestXFormRowComponent {
  controls: XControl[] = [
    new XInputControl({
      id: 'id',
      label: '编码',
      maxlength: 10,
      required: true,
      value: 909090
    }),
    new XInputControl({ id: 'name', label: '姓名', disabled: true }),
    new XInputControl({
      id: 'account',
      label: '账号',
      clearable: true,
      clearClick: (value: any) => {
        console.log(value);
      }
    }),
    new XInputControl({ id: 'password', label: '密码' }),
    new XInputControl({ id: 'file', label: '文件' }),
    new XSelectControl({ id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员' }),
    new XCascadeControl({
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
    }),
    new XColorPickerControl({
      id: 'color',
      label: '喜欢的颜色'
    }),
    new XDatePickerControl({
      id: 'createDate',
      label: '创建日期'
    }),
    new XInputNumberControl({
      id: 'age',
      label: '年龄'
    }),
    new XRadioControl({
      id: 'gender',
      label: '性别',
      data: ['男', '女']
    }),
    new XRateControl({
      id: 'level',
      label: '级别',
      count: 6
    }),
    new XSwitchControl({
      id: 'disabled',
      label: '禁用'
    }),
    new XTimePickerControl({
      id: 'time',
      label: '时间'
    }),
    new XSliderSelectControl({
      id: 'process',
      label: '进度'
    }),
    new XCheckboxControl({
      id: 'active',
      label: '爱好',
      data: ['乒乓球', '篮球', '足球']
    })
  ];
}

@Component({
  selector: 'test-x-form-title',
  template: `<x-form [controls]="controls" direction="row" label-suffix=":" label-width="6rem" label-align="end" span="12"></x-form>`
})
class TestXFormTitleComponent {
  controls: XFormRow[] = [
    {
      title: '基本信息',
      icon: 'fto-user',
      controls: [
        new XInputControl({ id: 'name', label: '姓名', required: true, maxlength: 10 }),
        new XInputControl({
          id: 'id',
          label: '编码',
          disabled: true,
          value: '001001001',
          required: true
        }),
        new XInputControl({
          id: 'account',
          label: '账号',
          clearable: true,
          clearClick: (value: any) => {
            console.log(value);
          },
          required: true
        }),
        new XInputControl({ id: 'password', label: '密码', type: 'password', required: true })
      ]
    },
    {
      title: '详细信息',
      icon: 'fto-list',
      controls: [
        new XInputControl({ id: 'file', label: '文件', required: true }),
        new XSelectControl({ id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员', required: true }),
        new XCascadeControl({
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
        }),
        new XColorPickerControl({
          id: 'color',
          label: '喜欢的颜色',
          required: true
        }),
        new XDatePickerControl({
          id: 'createDate',
          label: '创建日期',
          required: true
        }),
        new XInputNumberControl({
          id: 'age',
          label: '年龄',
          required: true
        }),
        new XRadioControl({
          id: 'gender',
          label: '性别',
          data: ['男', '女'],
          required: true
        }),
        new XRateControl({
          id: 'level',
          label: '级别',
          count: 6,
          required: true
        }),
        new XSwitchControl({
          id: 'disabled',
          label: '禁用'
        }),
        new XTimePickerControl({
          id: 'time',
          label: '时间',
          required: true
        }),
        new XSliderSelectControl({
          id: 'process',
          label: '进度',
          required: true
        }),
        new XCheckboxControl({
          id: 'active',
          label: '爱好',
          data: ['乒乓球', '篮球', '足球'],
          required: true
        })
      ]
    }
  ];
}
