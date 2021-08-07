import { XDocModule } from '@ng-nest/ui/doc';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDescriptionComponent } from './description.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XDescriptionModule } from '@ng-nest/ui/description';
import { XDescriptionPrefix } from './description.property';
import { XThemeModule } from '@ng-nest/ui/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XDescriptionPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XDescriptionModule, XLayoutModule, XDocModule],
      declarations: [TestXDescriptionComponent, TestXDescriptionBorderedComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDescriptionComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDescriptionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDescriptionComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  fdescribe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXDescriptionBorderedComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDescriptionBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDescriptionComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-description',
  template: `
    <x-theme showDark></x-theme>
    <x-description title="UserInfo">
      <x-description-item label="编码" gridArea="1/1/1/4">909090</x-description-item>
      <x-description-item label="姓名" gridArea="2/1">张三</x-description-item>
      <x-description-item label="账号" gridArea="2/2">zhangsan</x-description-item>
      <x-description-item label="密码" gridArea="2/3">******</x-description-item>
      <x-description-item label="文件" gridArea="3/1">个人资料.doc</x-description-item>
      <x-description-item label="角色" gridArea="3/2">管理员</x-description-item>
      <x-description-item label="城市" gridArea="3/3">张三</x-description-item>
      <x-description-item label="性别" gridArea="4/1">张三</x-description-item>
      <x-description-item label="年龄" gridArea="4/2">37</x-description-item>
      <x-description-item label="爱好" gridArea="4/3">乒乓球</x-description-item>
    </x-description>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
    `
  ]
})
class TestXDescriptionComponent {}

@Component({
  selector: 'test-x-description-bordered',
  template: `
    <x-theme showDark></x-theme>
    <x-description title="UserInfo" bordered>
      <x-description-item label="编码" gridArea="1/1/1/4">909090</x-description-item>
      <x-description-item label="姓名" gridArea="2/1">张三</x-description-item>
      <x-description-item label="账号" gridArea="2/2">zhangsan</x-description-item>
      <x-description-item label="密码" gridArea="2/3">******</x-description-item>
      <x-description-item label="文件" gridArea="3/1">个人资料.doc</x-description-item>
      <x-description-item label="角色" gridArea="3/2">管理员</x-description-item>
      <x-description-item label="城市" gridArea="3/3">张三</x-description-item>
      <x-description-item label="性别" gridArea="4/1">张三</x-description-item>
      <x-description-item label="年龄" gridArea="4/2">37</x-description-item>
      <x-description-item label="爱好" gridArea="4/3">乒乓球</x-description-item>
    </x-description>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
    `
  ]
})
class TestXDescriptionBorderedComponent {}
