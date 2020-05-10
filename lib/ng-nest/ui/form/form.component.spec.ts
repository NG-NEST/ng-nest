import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './form.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormModule } from '@ng-nest/ui/form';
import { XFormPrefix, XControl, XInputControl, XSelectControl } from './form.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XFormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XFormModule],
      declarations: [TestXFormComponent]
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
});

@Component({
  selector: 'test-x-form',
  template: ` <x-form [controls]="controls"></x-form> `
})
class TestXFormComponent {
  controls: XControl[] = [
    new XInputControl({ id: 'id', label: '编码', span: 6, maxlength: 10, required: true, value: 909090 }),
    new XInputControl({ id: 'name', label: '姓名', span: 6, disabled: true }),
    new XInputControl({
      id: 'account',
      label: '账号',
      span: 6,
      clearable: true,
      clear: (value: any) => {
        console.log(value);
      }
    }),
    new XInputControl({ id: 'password', label: '密码', span: 6 }),
    new XInputControl({ id: 'file', label: '文件', span: 6 }),
    new XSelectControl({ id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], span: 6 })
  ];
}
