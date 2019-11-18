import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XButtonComponent } from "./button.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XButtonModule } from "./button.module";
import { ButtonPrefix } from "./button.type";

describe(ButtonPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XButtonModule],
      declarations: [
        TestXButtonComponent,
        TestXButtonDiabledComponent,
        TestXButtonTextComponent,
        TestXButtonIconComponent,
        TestXButtonGroupComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXButtonComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXButtonDiabledComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonDiabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`text.`, () => {
    let fixture: ComponentFixture<TestXButtonTextComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonTextComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXButtonIconComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`group.`, () => {
    let fixture: ComponentFixture<TestXButtonGroupComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonGroupComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-button",
  template: `
    <div class="row">
      <x-button label="默认按钮"></x-button>
      <x-button label="主要按钮" type="primary"></x-button>
      <x-button label="成功按钮" type="success"></x-button>
      <x-button label="警告按钮" type="warning"></x-button>
      <x-button label="危险按钮" type="danger"></x-button>
    </div>
    <div class="row">
      <x-button label="朴素按钮" plain="true"></x-button>
      <x-button label="主要按钮" type="primary" plain="true"></x-button>
      <x-button label="成功按钮" type="success" plain="true"></x-button>
      <x-button label="警告按钮" type="warning" plain="true"></x-button>
      <x-button label="危险按钮" type="danger" plain="true"></x-button>
    </div>
    <div class="row">
      <x-button label="圆角按钮" round="true"></x-button>
      <x-button label="主要按钮" type="primary" round="true"></x-button>
      <x-button label="成功按钮" type="success" round="true"></x-button>
      <x-button label="警告按钮" type="warning" round="true"></x-button>
      <x-button label="危险按钮" type="danger" round="true"></x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle="true"></x-button>
      <x-button icon="fto-edit-3" type="primary" circle="true"></x-button>
      <x-button icon="fto-check" type="success" circle="true"></x-button>
      <x-button icon="fto-star" type="warning" circle="true"></x-button>
      <x-button icon="fto-trash-2" type="danger" circle="true"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonComponent {}

@Component({
  selector: "test-x-disabled-button",
  template: `
    <div class="row">
      <x-button label="默认按钮" disabled="true"></x-button>
      <x-button label="主要按钮" type="primary" disabled="true"></x-button>
      <x-button label="成功按钮" type="success" disabled="true"></x-button>
      <x-button label="警告按钮" type="warning" disabled="true"></x-button>
      <x-button label="危险按钮" type="danger" disabled="true"></x-button>
    </div>
    <div class="row">
      <x-button label="朴素按钮" plain="true" disabled="true"></x-button>
      <x-button label="主要按钮" type="primary" plain="true" disabled="true"></x-button>
      <x-button label="成功按钮" type="success" plain="true" disabled="true"></x-button>
      <x-button label="警告按钮" type="warning" plain="true" disabled="true"></x-button>
      <x-button label="危险按钮" type="danger" plain="true" disabled="true"></x-button>
    </div>
    <div class="row">
      <x-button label="圆角按钮" round="true" disabled="true"></x-button>
      <x-button label="主要按钮" type="primary" round="true" disabled="true"></x-button>
      <x-button label="成功按钮" type="success" round="true" disabled="true"></x-button>
      <x-button label="警告按钮" type="warning" round="true" disabled="true"></x-button>
      <x-button label="危险按钮" type="danger" round="true" disabled="true"></x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle="true" disabled="true"></x-button>
      <x-button icon="fto-edit-3" type="primary" circle="true" disabled="true"></x-button>
      <x-button icon="fto-check" type="success" circle="true" disabled="true"></x-button>
      <x-button icon="fto-star" type="warning" circle="true" disabled="true"></x-button>
      <x-button icon="fto-trash-2" type="danger" circle="true" disabled="true"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonDiabledComponent {}

@Component({
  selector: "test-x-text-button",
  template: `
    <div class="row">
      <x-button label="文字按钮" type="text"></x-button>
      <x-button label="文字按钮" type="text" disabled="true"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonTextComponent {}

@Component({
  selector: "test-x-icon-button",
  template: `
    <div class="row">
      <x-button icon="fto-edit-3" type="primary"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-trash-2" type="primary"></x-button>
      <x-button label="搜索" icon="fto-search" type="primary"></x-button>
      <x-button label="上传" icon="fto-upload-cloud" type="primary"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonIconComponent {}

@Component({
  selector: "test-x-group-button",
  template: `
    <div class="row">
      <x-buttons>
        <x-button label="上一页" icon="fto-chevron-left" type="primary"></x-button>
        <x-button label="下一页" icon="fto-chevron-right" direction="row-reverse" type="primary"></x-button>
      </x-buttons>
      <x-button label="搜索" icon="fto-search" type="primary"></x-button>
      <x-button label="上传" icon="fto-upload-cloud" type="primary"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonGroupComponent {}
