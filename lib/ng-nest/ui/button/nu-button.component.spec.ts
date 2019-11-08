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
      debugElement = fixture.debugElement.query(
        By.directive(NuButtonComponent)
      );
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

@Component({
  selector: "test-nu-button",
  template: `
    <nu-button [nuLabel]="'关注'"></nu-button>
    <br /><br />
    <nu-button [nuLabel]="'关注'" [nuIcon]="'ado-heart'"></nu-button>
    <br /><br />
    <nu-buttons>
      <nu-button [nuIcon]="'ado-align-left'"></nu-button>
      <nu-button [nuIcon]="'ado-align-center'"></nu-button>
      <nu-button [nuIcon]="'ado-align-right'"></nu-button>
    </nu-buttons>
    <br /><br />
    <nu-buttons [nuSpace]="1">
      <nu-button [nuLabel]="'保存'" [nuIcon]="'ado-save'"></nu-button>
      <nu-button [nuLabel]="'取消'"></nu-button>
    </nu-buttons>
  `
})
class TestNuButtonComponent {}
