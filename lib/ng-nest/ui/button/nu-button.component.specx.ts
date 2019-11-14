import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuButtonComponent } from "./nu-button.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuButtonModule } from "./nu-button.module";
import { ButtonPrefix } from "./nu-button.type";

describe(ButtonPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuButtonModule],
      declarations: [TestNuButtonComponent, TestNuButtonDiabledComponent, TestNuButtonTextComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuButtonComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuButtonComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestNuButtonDiabledComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuButtonDiabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`text.`, () => {
    let fixture: ComponentFixture<TestNuButtonTextComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuButtonTextComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

// <nu-button nuLabel="关注"></nu-button>
//     <br /><br />
//     <nu-button nuLabel="关注" nuIcon="ado-heart"></nu-button>
//     <br /><br />
//     <nu-buttons>
//       <nu-button nuIcon="ado-align-left"></nu-button>
//       <nu-button nuIcon="ado-align-center"></nu-button>
//       <nu-button nuIcon="ado-align-right"></nu-button>
//     </nu-buttons>
//     <br /><br />
//     <nu-buttons nuSpace="1">
//       <nu-button nuLabel="保存" nuIcon="ado-save"></nu-button>
//       <nu-button nuLabel="取消"></nu-button>
//     </nu-buttons>

@Component({
  selector: "test-nu-button",
  template: `
    <div class="row">
      <nu-button nuLabel="默认按钮"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger"></nu-button>
    </div>
    <div class="row">
      <nu-button nuLabel="朴素按钮" nuPlain="true"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary" nuPlain="true"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success" nuPlain="true"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning" nuPlain="true"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger" nuPlain="true"></nu-button>
    </div>
    <div class="row">
      <nu-button nuLabel="圆角按钮" nuRound="true"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary" nuRound="true"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success" nuRound="true"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning" nuRound="true"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger" nuRound="true"></nu-button>
    </div>
    <div class="row">
      <nu-button nuIcon="fto-search" nuCircle="true"></nu-button>
      <nu-button nuIcon="fto-edit-3" nuType="primary" nuCircle="true"></nu-button>
      <nu-button nuIcon="fto-check" nuType="success" nuCircle="true"></nu-button>
      <nu-button nuIcon="fto-star" nuType="warning" nuCircle="true"></nu-button>
      <nu-button nuIcon="fto-trash-2" nuType="danger" nuCircle="true"></nu-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > nu-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestNuButtonComponent {}

@Component({
  selector: "test-nu-disabled-button",
  template: `
    <div class="row">
      <nu-button nuLabel="默认按钮" nuDisabled="true"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary" nuDisabled="true"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success" nuDisabled="true"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning" nuDisabled="true"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger" nuDisabled="true"></nu-button>
    </div>
    <div class="row">
      <nu-button nuLabel="朴素按钮" nuPlain="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary" nuPlain="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success" nuPlain="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning" nuPlain="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger" nuPlain="true" nuDisabled="true"></nu-button>
    </div>
    <div class="row">
      <nu-button nuLabel="圆角按钮" nuRound="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="主要按钮" nuType="primary" nuRound="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="成功按钮" nuType="success" nuRound="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="警告按钮" nuType="warning" nuRound="true" nuDisabled="true"></nu-button>
      <nu-button nuLabel="危险按钮" nuType="danger" nuRound="true" nuDisabled="true"></nu-button>
    </div>
    <div class="row">
      <nu-button nuIcon="fto-search" nuCircle="true" nuDisabled="true"></nu-button>
      <nu-button nuIcon="fto-edit-3" nuType="primary" nuCircle="true" nuDisabled="true"></nu-button>
      <nu-button nuIcon="fto-check" nuType="success" nuCircle="true" nuDisabled="true"></nu-button>
      <nu-button nuIcon="fto-star" nuType="warning" nuCircle="true" nuDisabled="true"></nu-button>
      <nu-button nuIcon="fto-trash-2" nuType="danger" nuCircle="true" nuDisabled="true"></nu-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > nu-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestNuButtonDiabledComponent {}

@Component({
  selector: "test-nu-text-button",
  template: `
    <div class="row">
      <nu-button nuLabel="文字按钮" nuType="text"></nu-button>
      <nu-button nuLabel="文字按钮" nuType="text" nuDisabled="true"></nu-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > nu-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestNuButtonTextComponent {}
