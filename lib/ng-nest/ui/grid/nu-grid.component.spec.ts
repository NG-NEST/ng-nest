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
      declarations: [
        TestNuGridComponent,
        TestSpaceNuGridComponent,
        TestBlendNuGridComponent,
        TestOffsetNuGridComponent,
        TestFlexNuGridComponent,
        TestLayoutNuGridComponent,
        TestHiddenNuGridComponent
      ]
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
  describe(`blend.`, () => {
    let fixture: ComponentFixture<TestBlendNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestBlendNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`offset.`, () => {
    let fixture: ComponentFixture<TestOffsetNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestOffsetNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`flex.`, () => {
    let fixture: ComponentFixture<TestFlexNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestFlexNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`layout.`, () => {
    let fixture: ComponentFixture<TestLayoutNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestLayoutNuGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`hidden.`, () => {
    let fixture: ComponentFixture<TestHiddenNuGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHiddenNuGridComponent);
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
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) {
        background-color: #d3dce6;
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
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestSpaceNuGridComponent {}

@Component({
  selector: "test-blend-nu-grid",
  template: `
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="12">
        <div class="box">col-12</div>
      </nu-col>
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="8">
        <div class="box">col-8</div>
      </nu-col>
      <nu-col [nuSpan]="8">
        <div class="box">col-8</div>
      </nu-col>
      <nu-col [nuSpan]="4">
        <div class="box">col-4</div>
      </nu-col>
      <nu-col [nuSpan]="4">
        <div class="box">col-4</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="4">
        <div class="box">col-4</div>
      </nu-col>
      <nu-col [nuSpan]="20">
        <div class="box">col-20</div>
      </nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col > div.box {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestBlendNuGridComponent {}

@Component({
  selector: "test-offset-nu-grid",
  template: `
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuOffset]="6">
        <div class="box">col-6</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuOffset]="6">
        <div class="box">col-6</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuOffset]="6">
        <div class="box">col-6</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="18" [nuOffset]="6">
        <div class="box">col-18</div>
      </nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col > div.box {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestOffsetNuGridComponent {}

@Component({
  selector: "test-flex-nu-grid",
  template: `
    <nu-row [nuJustify]="'start'">
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
    <nu-row [nuJustify]="'end'">
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
    <nu-row [nuJustify]="'center'">
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
    <nu-row [nuJustify]="'space-around'">
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
    <nu-row [nuJustify]="'space-between'">
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
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestFlexNuGridComponent {}

@Component({
  selector: "test-layout-nu-grid",
  template: `
    <nu-row [nuSpace]="1">
      <nu-col [nuXs]="8" [nuSm]="6" [nuMd]="4" [nuLg]="3" [nuXl]="1">
        <div class="box"></div>
      </nu-col>
      <nu-col [nuXs]="4" [nuSm]="6" [nuMd]="8" [nuLg]="9" [nuXl]="11">
        <div class="box"></div>
      </nu-col>
      <nu-col [nuXs]="4" [nuSm]="6" [nuMd]="8" [nuLg]="9" [nuXl]="11">
        <div class="box"></div>
      </nu-col>
      <nu-col [nuXs]="8" [nuSm]="6" [nuMd]="4" [nuLg]="3" [nuXl]="1">
        <div class="box"></div>
      </nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col > div.box {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestLayoutNuGridComponent {}

@Component({
  selector: "test-hidden-nu-grid",
  template: `
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuHiddenXsOnly]="true">
        <div class="box">hidden-xs-only</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuHiddenSmOnly]="true">
        <div class="box">hidden-sm-only</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenSmAndDown]="true">
        <div class="box">hidden-sm-and-down</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenSmAndUp]="true">
        <div class="box">hidden-sm-and-up</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuHiddenMdOnly]="true">
        <div class="box">hidden-md-only</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenMdAndDown]="true">
        <div class="box">hidden-md-and-down</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenMdAndUp]="true">
        <div class="box">hidden-md-and-up</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuHiddenLgOnly]="true">
        <div class="box">hidden-lg-only</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenLgAndDown]="true">
        <div class="box">hidden-lg-and-down</div>
      </nu-col>
      <nu-col [nuSpan]="6" [nuHiddenLgAndUp]="true">
        <div class="box">hidden-lg-and-up</div>
      </nu-col>
    </nu-row>
    <nu-row [nuSpace]="1">
      <nu-col [nuSpan]="6" [nuHiddenXlOnly]="true">
        <div class="box">hidden-xl-only</div>
      </nu-col>
    </nu-row>
  `,
  styles: [
    `
      nu-row {
        margin: 1rem 0;
      }
      nu-row > nu-col > div.box {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      nu-row > nu-col:nth-child(odd) > div.box {
        background-color: #e5e9f2;
      }
      nu-row > nu-col:nth-child(even) > div.box {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestHiddenNuGridComponent {}
