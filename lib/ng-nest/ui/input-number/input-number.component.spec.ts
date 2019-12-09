import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XInputNumberComponent } from "./input-number.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XInputNumberModule } from "./input-number.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XInputNumberPrefix } from "./input-number.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XInputNumberPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInputNumberModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXInputNumberComponent,
        TestXInputNumberLabelComponent,
        TestXInputNumberLimitComponent,
        TestXInputNumberPrecisionComponent,
        TestXInputNumberDisabledComponent,
        TestXInputNumberRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputNumberComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputNumberComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXInputNumberLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`limit.`, () => {
    let fixture: ComponentFixture<TestXInputNumberLimitComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberLimitComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberLimitComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`precision.`, () => {
    let fixture: ComponentFixture<TestXInputNumberPrecisionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberPrecisionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberPrecisionComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXInputNumberDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXInputNumberRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
    `
  ]
})
class TestXInputNumberComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number label="数量"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="column-reverse"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="row"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="row-reverse"></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputNumberLabelComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number max="10"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number min="1"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number min="1" max="10"></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputNumberLimitComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number precision="2" step="0.1"></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputNumberPrecisionComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number disabled></x-input-number>
      </x-col>
      <x-col>
        <x-input-number disabled [(ngModel)]="model"></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputNumberDisabledComponent {
  model = 10;
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-number required></x-input-number>
      </x-col>
      <x-col>
        <x-input-number label="数量" required></x-input-number>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputNumberRequiredComponent {}
