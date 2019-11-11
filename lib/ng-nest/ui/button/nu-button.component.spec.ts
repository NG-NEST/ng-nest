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
      declarations: [TestNuButtonComponent]
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
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(ButtonPrefix);
    });
  });
});

// <nu-button [nuLabel]="'关注'"></nu-button>
//     <br /><br />
//     <nu-button [nuLabel]="'关注'" [nuIcon]="'ado-heart'"></nu-button>
//     <br /><br />
//     <nu-buttons>
//       <nu-button [nuIcon]="'ado-align-left'"></nu-button>
//       <nu-button [nuIcon]="'ado-align-center'"></nu-button>
//       <nu-button [nuIcon]="'ado-align-right'"></nu-button>
//     </nu-buttons>
//     <br /><br />
//     <nu-buttons [nuSpace]="1">
//       <nu-button [nuLabel]="'保存'" [nuIcon]="'ado-save'"></nu-button>
//       <nu-button [nuLabel]="'取消'"></nu-button>
//     </nu-buttons>

@Component({
  selector: "test-nu-button",
  template: `
    <div class="row">
      <nu-button [nuLabel]="'默认按钮'"></nu-button>
      <nu-button [nuLabel]="'主要按钮'" [nuType]="'primary'"></nu-button>
      <nu-button [nuLabel]="'成功按钮'" [nuType]="'success'"></nu-button>
      <nu-button [nuLabel]="'信息按钮'" [nuType]="'info'"></nu-button>
      <nu-button [nuLabel]="'警告按钮'" [nuType]="'warning'"></nu-button>
      <nu-button [nuLabel]="'危险按钮'" [nuType]="'danger'"></nu-button>
    </div>
    <div class="row">
      <nu-button [nuLabel]="'默认按钮'" [nuPlain]="true"></nu-button>
      <nu-button [nuLabel]="'主要按钮'" [nuType]="'primary'" [nuPlain]="true"></nu-button>
      <nu-button [nuLabel]="'成功按钮'" [nuType]="'success'" [nuPlain]="true"></nu-button>
      <nu-button [nuLabel]="'信息按钮'" [nuType]="'info'" [nuPlain]="true"></nu-button>
      <nu-button [nuLabel]="'警告按钮'" [nuType]="'warning'" [nuPlain]="true"></nu-button>
      <nu-button [nuLabel]="'危险按钮'" [nuType]="'danger'" [nuPlain]="true"></nu-button>
    </div>
    <div class="row">
      <nu-button [nuLabel]="'默认按钮'" [nuRound]="true"></nu-button>
      <nu-button [nuLabel]="'主要按钮'" [nuType]="'primary'" [nuRound]="true"></nu-button>
      <nu-button [nuLabel]="'成功按钮'" [nuType]="'success'" [nuRound]="true"></nu-button>
      <nu-button [nuLabel]="'信息按钮'" [nuType]="'info'" [nuRound]="true"></nu-button>
      <nu-button [nuLabel]="'警告按钮'" [nuType]="'warning'" [nuRound]="true"></nu-button>
      <nu-button [nuLabel]="'危险按钮'" [nuType]="'danger'" [nuRound]="true"></nu-button>
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
