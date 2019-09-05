import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmGridModule } from "./nm-grid.module";
import { GridPrefix, RowPrefix } from "./nm-grid.type";
import { NmRowComponent } from "./nm-row.component";

describe(GridPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmGridModule],
      declarations: [TestNmGridComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(RowPrefix);
    });
  });
});

@Component({
  selector: "test-nm-grid",
  template: `
    <nm-row>
      <nm-col [nmSpan]="12">col-12</nm-col>
      <nm-col [nmSpan]="12">col-12</nm-col>
    </nm-row>
    <nm-row>
      <nm-col [nmSpan]="8">col-8</nm-col>
      <nm-col [nmSpan]="8">col-8</nm-col>
      <nm-col [nmSpan]="8">col-8</nm-col>
    </nm-row>
    <nm-row>
      <nm-col [nmSpan]="6">col-6</nm-col>
      <nm-col [nmSpan]="6">col-6</nm-col>
      <nm-col [nmSpan]="6">col-6</nm-col>
      <nm-col [nmSpan]="6">col-6</nm-col>
    </nm-row>
  `,
  styles: [
    `
      nm-row {
        margin: 1rem 0;
      }
      nm-row > nm-col {
        color: #ffffff;
        padding: 1rem;
        text-align: center;
      }
      nm-row > nm-col:nth-child(odd) {
        background-color: #3f51b5e0;
      }
      nm-row > nm-col:nth-child(even) {
        background-color: #3f51b5;
      }
    `
  ]
})
class TestNmGridComponent {}
