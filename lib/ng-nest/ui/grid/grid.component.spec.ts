import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XGridModule } from "./grid.module";
import { XRowPrefix } from "./grid.type";
import { XRowComponent } from "./row.component";

describe("grid", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XGridModule],
      declarations: [
        TestGridComponent,
        TestSpaceGridComponent,
        TestBlendGridComponent,
        TestOffsetGridComponent,
        TestFlexGridComponent,
        TestLayoutGridComponent,
        TestHiddenGridComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`space.`, () => {
    let fixture: ComponentFixture<TestSpaceGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSpaceGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`blend.`, () => {
    let fixture: ComponentFixture<TestBlendGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestBlendGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`offset.`, () => {
    let fixture: ComponentFixture<TestOffsetGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestOffsetGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`flex.`, () => {
    let fixture: ComponentFixture<TestFlexGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestFlexGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`layout.`, () => {
    let fixture: ComponentFixture<TestLayoutGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestLayoutGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`hidden.`, () => {
    let fixture: ComponentFixture<TestHiddenGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHiddenGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-grid",
  template: `
    <x-row>
      <x-col span="12">col-12</x-col>
      <x-col span="12">col-12</x-col>
    </x-row>
    <x-row>
      <x-col span="8">col-8</x-col>
      <x-col span="8">col-8</x-col>
      <x-col span="8">col-8</x-col>
    </x-row>
    <x-row>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestGridComponent {}

@Component({
  selector: "test-space-x-grid",
  template: `
    <x-row space="1">
      <x-col span="12"><div>col-12</div></x-col>
      <x-col span="12"><div>col-12</div></x-col>
    </x-row>
    <x-row space="2">
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
    </x-row>
    <x-row space="3">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestSpaceGridComponent {}

@Component({
  selector: "test-blend-x-grid",
  template: `
    <x-row space="1">
      <x-col span="12"><div>col-12</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="4"><div>col-4</div></x-col>
      <x-col span="4"><div>col-4</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="4"><div>col-4</div></x-col>
      <x-col span="20"><div>col-20</div></x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestBlendGridComponent {}

@Component({
  selector: "test-offset-x-grid",
  template: `
    <x-row space="1">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6" offset="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" offset="6"><div>col-6</div></x-col>
      <x-col span="6" offset="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="18" offset="6"><div>col-18</div></x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestOffsetGridComponent {}

@Component({
  selector: "test-flex-x-grid",
  template: `
    <x-row justify="start">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="end">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="center">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="space-around">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="space-between">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestFlexGridComponent {}

@Component({
  selector: "test-layout-x-grid",
  template: `
    <x-row space="1">
      <x-col xs="8" sm="6" md="4" lg="3" xl="1">
        <div></div>
      </x-col>
      <x-col xs="4" sm="6" md="8" lg="9" xl="11">
        <div></div>
      </x-col>
      <x-col xs="4" sm="6" md="8" lg="9" xl="11">
        <div></div>
      </x-col>
      <x-col xs="8" sm="6" md="4" lg="3" xl="1">
        <div></div>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestLayoutGridComponent {}

@Component({
  selector: "test-hidden-x-grid",
  template: `
    <x-row space="1">
      <x-col span="6" x-hidden-sm-only>
        <div>hidden-xs-only</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-sm-only>
        <div>hidden-sm-only</div>
      </x-col>
      <x-col span="6" x-hidden-sm-and-down>
        <div>hidden-sm-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-sm-and-up>
        <div>hidden-sm-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-md-only>
        <div>hidden-md-only</div>
      </x-col>
      <x-col span="6" x-hidden-md-and-down>
        <div>hidden-md-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-md-and-up>
        <div>hidden-md-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-lg-only>
        <div>hidden-lg-only</div>
      </x-col>
      <x-col span="6" x-hidden-lg-and-down>
        <div>hidden-lg-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-lg-and-up>
        <div>hidden-lg-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-xl-only>
        <div>hidden-xl-only</div>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: #848181;
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: #e5e9f2;
      }
      x-row > x-col:nth-child(even) > div {
        background-color: #d3dce6;
      }
    `
  ]
})
class TestHiddenGridComponent {}
