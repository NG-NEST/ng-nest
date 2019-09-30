import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmButtonComponent } from "./nm-button.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmButtonModule } from "./nm-button.module";
import { ButtonPrefix } from "./nm-button.type";

describe(ButtonPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmButtonModule],
      declarations: [TestNmButtonComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmButtonComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmButtonComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmButtonComponent)
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
  selector: "test-nm-button",
  template: `
    <nm-button [nmLabel]="'关注'"></nm-button>
    <br /><br />
    <nm-button [nmLabel]="'关注'" [nmIcon]="'ado-heart'"></nm-button>
    <br /><br />
    <nm-buttons>
      <nm-button [nmIcon]="'ado-align-left'"></nm-button>
      <nm-button [nmIcon]="'ado-align-center'"></nm-button>
      <nm-button [nmIcon]="'ado-align-right'"></nm-button>
    </nm-buttons>
    <br /><br />
    <nm-buttons [nmSpace]="1">
      <nm-button [nmLabel]="'保存'" [nmIcon]="'ado-save'"></nm-button>
      <nm-button [nmLabel]="'取消'"></nm-button>
    </nm-buttons>
  `
})
class TestNmButtonComponent {}
