import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTableComponent } from "./nm-table.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTableModule } from "./nm-table.module";
import { TablePrefix } from "./nm-table.type";

describe(TablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmTableModule],
      declarations: [TestNmTableComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmTableComponent>;
    let testComponent: TestNmTableComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmTableComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmTableComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(TablePrefix);
    });
    it("change padding.", () => {
      testComponent.padding = "1rem 0";
      fixture.detectChanges();
      expect(element.classList).toContain(TablePrefix);
    });
  });
});

@Component({
  selector: "test-nm-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <nm-table></nm-table>
    </div>
  `
})
class TestNmTableComponent {
  padding: string = "1rem";
}
