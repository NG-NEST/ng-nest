import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmFormComponent } from "./nm-form.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmFormModule } from "./nm-form.module";
import { FormPrefix, NmControl, NmInputControl } from "./nm-form.type";

describe(FormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmFormModule],
      declarations: [TestNmFormComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmFormComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmFormComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmFormComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(FormPrefix);
    });
  });
});

@Component({
  selector: "test-nm-form",
  template: `
    <nm-form [nmControls]="controls"></nm-form>
  `
})
class TestNmFormComponent {
  controls: NmControl<any>[] = [
    new NmInputControl({ nmKey: "id", nmLabel: "编码" })
  ];
}
