import { XButtonModule } from "@ng-nest/ui/button";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XRateComponent } from "./rate.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XRateModule } from "./rate.module";
import { FormsModule } from "@angular/forms";
import { XRatePrefix } from "./rate.type";

describe(XRatePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XRateModule, XButtonModule, XFenceModule],
      declarations: [TestXRateComponent, TestXRateDisabledComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRateComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it("should create.", () => {
      expect(rate).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXRateDisabledComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateDisabledComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it("should create.", () => {
      expect(rate).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate [(ngModel)]="model"></x-rate>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateComponent {
  model = 3;
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate disabled></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate [(ngModel)]="model" disabled></x-rate>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateDisabledComponent {
  model = 3;
}
