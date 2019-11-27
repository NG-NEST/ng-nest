import { async, ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";

import { XRadioComponent } from "./radio.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XGridModule } from "@ng-nest/ui/grid";
import { XRadioModule } from "./radio.module";
import { FormsModule } from "@angular/forms";
import { XDocModule } from "@ng-nest/ui/doc";
import { XRadioPrefix } from "./radio.type";
import { XRadiosComponent } from "./radios.component";

describe(XRadioPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XRadioModule, XGridModule, XDocModule],
      declarations: [TestXRadioComponent, TestXRadiosComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRadioComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`radios.`, () => {
    let fixture: ComponentFixture<TestXRadiosComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadiosComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadiosComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadiosComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-radio label="苹果"></x-radio>
    <x-radio label="梨子" checked></x-radio>
    <x-radio label="香蕉" disabled></x-radio>
    <x-radio label="柚子" disabled checked></x-radio>
  `
})
class TestXRadioComponent {}

@Component({
  template: `
    <x-radios [(ngModel)]="ngModel">
      <x-radio label="苹果" value="001"></x-radio>
      <x-radio label="梨子" value="002"></x-radio>
      <x-radio label="香蕉" value="003"></x-radio>
      <x-radio label="柚子" value="004"></x-radio>
    </x-radios>
  `
})
class TestXRadiosComponent {
  ngModel = "002";
}
