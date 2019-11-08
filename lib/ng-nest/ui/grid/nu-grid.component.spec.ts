import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuGridModule } from "./nu-grid.module";
import { RowPrefix } from "./nu-grid.type";
import { NuRowComponent } from "./nu-row.component";

describe("nu-grid", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuGridModule],
      declarations: [TestNuGridComponent, TestSpaceNuGridComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
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
  describe(`space.`, () => {
    let fixture: ComponentFixture<TestSpaceNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSpaceNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nu-grid",
  template: `
    <nu-row>
      <nu-col [nuSpan]="12">col-12</nu-col>
      <nu-col [nuSpan]="12">col-12</nu-col>
    </nu-row>
    <nu-row>
      <nu-col [nuSpan]="8">col-8</nu-col>
      <nu-col [nuSpan]="8">col-8</nu-col>
      <nu-col [nuSpan]="8">col-8</nu-col>
    </nu-row>
    <nu-row>
      <nu-col [nuSpan]="6">col-6</nu-col>
      <nu-col [nuSpan]="6">col-6</nu-col>
      <nu-col [nuSpan]="6">col-6</nu-col>
      <nu-col [nuSpan]="6">col-6</nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col {
        color: #ffffff;
        padding: 1rem;
        text-align: center;
      }
      nu-row > nu-col:nth-child(odd) {
        background-color: #3f51b5e0;
      }
      nu-row > nu-col:nth-child(even) {
        background-color: #3f51b5;
      }
    `
  ]
})
class TestNuGridComponent {}

@Component({
  selector: "test-space-nu-grid",
  template: `
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="12">
        <div class="box">col-12</div>
      </nu-col>
      <nu-col [nuSpan]="12">
        <div class="box">col-12</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="2">
      <nu-col [nuSpan]="8">
        <div class="box">col-8</div>
      </nu-col>
      <nu-col [nuSpan]="8">
        <div class="box">col-8</div>
      </nu-col>
      <nu-col [nuSpan]="8">
        <div class="box">col-8</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="3">
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col > div.box {
        color: #ffffff;
        padding: 1rem;
        text-align: center;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #3f51b5e0;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #3f51b5;
      }
    `
  ]
})
class TestSpaceNuGridComponent {}
