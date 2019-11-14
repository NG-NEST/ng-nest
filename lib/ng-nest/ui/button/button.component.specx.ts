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
      declarations: [TestXButtonComponent, TestXButtonDiabledComponent, TestXButtonTextComponent]
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
});

// <x-button label="关注"></x-button>
//     <br /><br />
//     <x-button label="关注" icon="ado-heart"></x-button>
//     <br /><br />
//     <x-buttons>
//       <x-button icon="ado-align-left"></x-button>
//       <x-button icon="ado-align-center"></x-button>
//       <x-button icon="ado-align-right"></x-button>
//     </x-buttons>
//     <br /><br />
//     <x-buttons space="1">
//       <x-button label="保存" icon="ado-save"></x-button>
//       <x-button label="取消"></x-button>
//     </x-buttons>

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
