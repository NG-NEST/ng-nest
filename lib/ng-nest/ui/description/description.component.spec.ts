import { XDocModule } from '@ng-nest/ui/doc';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDescriptionComponent } from './description.component';
import { ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XDescriptionModule } from '@ng-nest/ui/description';
import { XDescriptionPrefix } from './description.property';
import { XThemeModule } from '@ng-nest/ui/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XRadioModule } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

describe(XDescriptionPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, XThemeModule, XDescriptionModule, XRadioModule, XLayoutModule, XDocModule],
      declarations: [
        TestXDescriptionComponent,
        TestXDescriptionBorderedComponent,
        TestXDescriptionGridComponent,
        TestXDescriptionSizeComponent
      ]
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
  describe(`bordered.`, () => {
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
  describe(`grid.`, () => {
    let fixture: ComponentFixture<TestXDescriptionGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDescriptionGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDescriptionComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  fdescribe(`size.`, () => {
    let fixture: ComponentFixture<TestXDescriptionSizeComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDescriptionSizeComponent);
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
      <x-description-item label="编码：" gridArea="1/1/1/4">909090</x-description-item>
      <x-description-item label="姓名：" gridArea="2/1">张三</x-description-item>
      <x-description-item label="账号：" gridArea="2/2">zhangsan</x-description-item>
      <x-description-item label="密码：" gridArea="2/3">******</x-description-item>
      <x-description-item label="文件：" gridArea="3/1">个人资料.doc</x-description-item>
      <x-description-item label="角色：" gridArea="3/2">管理员</x-description-item>
      <x-description-item label="城市：" gridArea="3/3">张三</x-description-item>
      <x-description-item label="性别：" gridArea="4/1">张三</x-description-item>
      <x-description-item label="年龄：" gridArea="4/2">37</x-description-item>
      <x-description-item label="爱好：" gridArea="4/3">乒乓球</x-description-item>
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
      <x-description-item label="编码：" gridArea="1/1/1/5">909090</x-description-item>
      <x-description-item label="基本资料" gridArea="2/1/5/2" justify="center" align="center"></x-description-item>
      <x-description-item label="姓名：" gridArea="2/2">张三</x-description-item>
      <x-description-item label="账号：" gridArea="2/3">zhangsan</x-description-item>
      <x-description-item label="密码：" gridArea="2/4">******</x-description-item>
      <x-description-item label="文件：" gridArea="3/2">个人资料.doc</x-description-item>
      <x-description-item label="角色：" gridArea="3/3">管理员</x-description-item>
      <x-description-item label="城市：" gridArea="3/4">张三</x-description-item>
      <x-description-item label="性别：" gridArea="4/2">张三</x-description-item>
      <x-description-item label="年龄：" gridArea="4/3">37</x-description-item>
      <x-description-item label="爱好：" gridArea="4/4">乒乓球</x-description-item>
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

@Component({
  selector: 'test-x-description-grid',
  template: `
    <x-theme showDark></x-theme>
    <x-description title="UserInfo" bordered gridTemplateColumns="100px 1fr 1fr 1fr 1fr 1fr 1fr">
      <x-description-item label="编码" justify="center" align="center" gridArea="1/1/2/2" heading></x-description-item>
      <x-description-item gridArea="1/2/1/8">909090</x-description-item>
      <x-description-item label="基本资料" gridArea="2/1/5/2" justify="center" align="center" heading></x-description-item>
      <x-description-item label="姓名" gridArea="2/2" heading></x-description-item>
      <x-description-item gridArea="2/3">张三</x-description-item>
      <x-description-item label="账号" gridArea="2/4" heading></x-description-item>
      <x-description-item gridArea="2/5">zhangsan</x-description-item>
      <x-description-item label="密码" gridArea="2/6" heading></x-description-item>
      <x-description-item gridArea="2/7">******</x-description-item>
      <x-description-item label="文件" gridArea="3/2" heading></x-description-item>
      <x-description-item gridArea="3/3">个人资料.doc</x-description-item>
      <x-description-item label="角色" gridArea="3/4" heading></x-description-item>
      <x-description-item gridArea="3/5">管理员</x-description-item>
      <x-description-item label="城市" gridArea="3/6" heading></x-description-item>
      <x-description-item gridArea="3/7">张三</x-description-item>
      <x-description-item label="性别" gridArea="4/2" heading></x-description-item>
      <x-description-item gridArea="4/3">张三</x-description-item>
      <x-description-item label="年龄" gridArea="4/4" heading></x-description-item>
      <x-description-item gridArea="4/5">37</x-description-item>
      <x-description-item label="爱好" gridArea="4/6" heading></x-description-item>
      <x-description-item gridArea="4/7">乒乓球</x-description-item>
    </x-description>
    <x-description title="UserInfo" bordered gridTemplateColumns="100px 1fr 1fr 1fr">
      <x-description-item label="编码" gridArea="1/1/1/5" heading></x-description-item>
      <x-description-item gridArea="2/1/2/5">909090</x-description-item>
      <x-description-item label="基本资料" gridArea="3/1/9/2" justify="center" align="center" heading></x-description-item>
      <x-description-item label="姓名" gridArea="3/2" heading></x-description-item>
      <x-description-item gridArea="4/2">张三</x-description-item>
      <x-description-item label="账号" gridArea="3/3" heading></x-description-item>
      <x-description-item gridArea="4/3">zhangsan</x-description-item>
      <x-description-item label="密码" gridArea="3/4" heading></x-description-item>
      <x-description-item gridArea="4/4">******</x-description-item>
      <x-description-item label="文件" gridArea="5/2" heading></x-description-item>
      <x-description-item gridArea="6/2">个人资料.doc</x-description-item>
      <x-description-item label="角色" gridArea="5/3" heading></x-description-item>
      <x-description-item gridArea="6/3">管理员</x-description-item>
      <x-description-item label="城市" gridArea="5/4" heading></x-description-item>
      <x-description-item gridArea="6/4">张三</x-description-item>
      <x-description-item label="性别" gridArea="7/2" heading></x-description-item>
      <x-description-item gridArea="8/2">张三</x-description-item>
      <x-description-item label="年龄" gridArea="7/3" heading></x-description-item>
      <x-description-item gridArea="8/3">37</x-description-item>
      <x-description-item label="爱好" gridArea="7/4" heading></x-description-item>
      <x-description-item gridArea="8/4">乒乓球</x-description-item> -->
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
class TestXDescriptionGridComponent {}

@Component({
  selector: 'test-x-description-grid',
  template: `
    <x-theme showDark></x-theme>
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-description title="UserInfo" bordered [size]="size">
      <x-description-item label="编码：" gridArea="1/1/1/5">909090</x-description-item>
      <x-description-item label="基本资料" gridArea="2/1/5/2" justify="center" align="center"></x-description-item>
      <x-description-item label="姓名：" gridArea="2/2">张三</x-description-item>
      <x-description-item label="账号：" gridArea="2/3">zhangsan</x-description-item>
      <x-description-item label="密码：" gridArea="2/4">******</x-description-item>
      <x-description-item label="文件：" gridArea="3/2">个人资料.doc</x-description-item>
      <x-description-item label="角色：" gridArea="3/3">管理员</x-description-item>
      <x-description-item label="城市：" gridArea="3/4">张三</x-description-item>
      <x-description-item label="性别：" gridArea="4/2">张三</x-description-item>
      <x-description-item label="年龄：" gridArea="4/3">37</x-description-item>
      <x-description-item label="爱好：" gridArea="4/4">乒乓球</x-description-item>
    </x-description>
    <x-description title="UserInfo" [size]="size">
      <x-description-item label="编码：" gridArea="1/1/1/4">909090</x-description-item>
      <x-description-item label="姓名：" gridArea="2/1">张三</x-description-item>
      <x-description-item label="账号：" gridArea="2/2">zhangsan</x-description-item>
      <x-description-item label="密码：" gridArea="2/3">******</x-description-item>
      <x-description-item label="文件：" gridArea="3/1">个人资料.doc</x-description-item>
      <x-description-item label="角色：" gridArea="3/2">管理员</x-description-item>
      <x-description-item label="城市：" gridArea="3/3">张三</x-description-item>
      <x-description-item label="性别：" gridArea="4/1">张三</x-description-item>
      <x-description-item label="年龄：" gridArea="4/2">37</x-description-item>
      <x-description-item label="爱好：" gridArea="4/3">乒乓球</x-description-item>
    </x-description>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      :host x-description {
        display: block;
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDescriptionSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';

  constructor(private cdr: ChangeDetectorRef) {}

  change($event: string) {
    console.log($event);
    this.cdr.detectChanges();
  }
}
