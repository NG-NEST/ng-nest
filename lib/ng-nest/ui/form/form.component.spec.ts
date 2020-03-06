import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './form.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormModule } from './form.module';
import { FormPrefix, XControl, XInputControl } from './form.type';

describe(FormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XFormModule],
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
  template: `
    <x-form [controls]="controls"></x-form>
  `
})
class TestXFormComponent {
  controls: XControl[] = [
    new XInputControl({ id: 'id', label: '编码', span: 6 }),
    new XInputControl({ id: 'name', label: '姓名', span: 6 }),
    new XInputControl({ id: 'account', label: '账号', span: 6 }),
    new XInputControl({ id: 'password', label: '密码', span: 6 })
  ];
}
