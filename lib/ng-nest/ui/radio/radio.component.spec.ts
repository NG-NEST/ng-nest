import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XRadioComponent } from "./radio.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XGridModule } from "@ng-nest/ui/grid";
import { XRadioModule } from "./radio.module";
import { FormsModule } from "@angular/forms";
import { XDocModule } from "@ng-nest/ui/doc";
import { XRadioPrefix } from "./radio.type";

describe(XRadioPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XRadioModule, XGridModule, XDocModule],
      declarations: [TestXRadioComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRadioComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRadioComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should checked.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-radio",
  template: `
    <x-radio [(ngModel)]="select" label="苹果"></x-radio>
    <x-radio [(ngModel)]="select" label="梨子"></x-radio>
    <x-radio [(ngModel)]="select" label="香蕉"></x-radio>
  `,
  styles: [``]
})
class TestXRadioComponent {
  select: any;
}
