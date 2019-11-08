import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuFormComponent } from "./nu-form.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuFormModule } from "./nu-form.module";
import { FormPrefix, NuControl, NuInputControl } from "./nu-form.type";

describe(FormPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuFormModule],
      declarations: [TestNuFormComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuFormComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuFormComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuFormComponent));
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
  selector: "test-nu-form",
  template: `
    <nu-form [nuControls]="controls"></nu-form>
  `
})
class TestNuFormComponent {
  controls: NuControl<any>[] = [
    new NuInputControl({ nuKey: "id", nuLabel: "编码", nuSpan: 6 }),
    new NuInputControl({ nuKey: "name", nuLabel: "姓名", nuSpan: 6 }),
    new NuInputControl({ nuKey: "account", nuLabel: "账号", nuSpan: 6 }),
    new NuInputControl({ nuKey: "password", nuLabel: "密码", nuSpan: 6 })
  ];
}
