import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './form.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
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
import { interval } from 'rxjs';

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

@Component({
  selector: 'test-x-form',
  template: `<x-form [controls]="controls"></x-form>`
})
class TestXFormComponent {
  controls: XControl[] = [
    new XInputControl({
      id: 'id',
      label: '编码',
      span: 6,
      maxlength: 10,
      required: true,
      value: 909090
    }),
    new XInputControl({ id: 'name', label: '姓名', span: 6, disabled: true }),
    new XInputControl({
      id: 'account',
      label: '账号',
      span: 6,
      clearable: true,
      clearClick: (value: any) => {
        console.log(value);
      }
    }),
    new XInputControl({ id: 'password', label: '密码', span: 6 }),
    new XInputControl({ id: 'file', label: '文件', span: 6 }),
    new XSelectControl({ id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员', span: 6 }),
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
      span: 6
    }),
    new XColorPickerControl({
      id: 'color',
      label: '喜欢的颜色',
      span: 6
    }),
    new XDatePickerControl({
      id: 'createDate',
      label: '创建日期',
      span: 6
    }),
    new XInputNumberControl({
      id: 'age',
      label: '年龄',
      span: 6
    }),
    new XRadioControl({
      id: 'gender',
      label: '性别',
      data: ['男', '女'],
      span: 6
    }),
    new XRateControl({
      id: 'level',
      label: '级别',
      count: 6,
      span: 6
    }),
    new XSwitchControl({
      id: 'disabled',
      label: '禁用',
      span: 6
    }),
    new XTimePickerControl({
      id: 'time',
      label: '时间',
      span: 6
    }),
    new XSliderSelectControl({
      id: 'process',
      label: '进度',
      span: 12
    }),
    new XCheckboxControl({
      id: 'active',
      label: '爱好',
      data: ['乒乓球', '篮球', '足球'],
      span: 12
    })
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
