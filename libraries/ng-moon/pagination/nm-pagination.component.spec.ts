import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmPaginationComponent } from "./nm-pagination.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmPaginationModule } from "./nm-pagination.module";
import { PaginationPrefix } from "./nm-pagination.type";

describe(PaginationPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmPaginationModule],
      declarations: [TestNmPaginationComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmPaginationComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmPaginationComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmPaginationComponent)
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
  selector: "test-nm-pagination",
  template: `
    <nm-pagination
      [nmIndex]="index"
      [nmSize]="size"
      [nmTotal]="total"
      (nmIndexChange)="change($event)"
    ></nm-pagination>
  `
})
class TestNmPaginationComponent {
  index = 5;
  size = 15;
  total = 80;
  change(index: number) {
    console.log(index);
  }
}
