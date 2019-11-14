import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuPaginationComponent } from "./nu-pagination.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuPaginationModule } from "./nu-pagination.module";
import { PaginationPrefix } from "./nu-pagination.type";

describe(PaginationPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuPaginationModule],
      declarations: [TestNuPaginationComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuPaginationComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuPaginationComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuPaginationComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(PaginationPrefix);
    });
  });
});

@Component({
  selector: "test-nu-pagination",
  template: `
    <nu-pagination
      [nuIndex]="index"
      [nuSize]="size"
      [nuTotal]="total"
      (nuIndexChange)="change($event)"
    ></nu-pagination>
  `
})
class TestNuPaginationComponent {
  index = 1;
  size = 10;
  total = 25;
  change(index: number) {
    console.log(index);
  }
}
