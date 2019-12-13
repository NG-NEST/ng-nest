import { interval } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XSwitchComponent } from "./switch.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XSwitchModule } from "./switch.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XSwitchPrefix } from "./switch.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XSwitchPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XSwitchModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [TestXSwitchComponent, TestXSwitchLabelComponent, TestXSwitchDisabledComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSwitchComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSwitchComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSwitchLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSwitchLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSwitchDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSwitchDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model1" (ngModelChange)="change($event)"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model2" (ngModelChange)="change($event)"></x-switch>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSwitchComponent {
  model1: boolean;
  model2 = true;
  constructor(private cdr: ChangeDetectorRef) {}
  change(event) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-switch label="方式"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="column-reverse"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="row"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="row-reverse"></x-switch>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSwitchLabelComponent {
  constructor(private cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-switch disabled></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model" disabled></x-switch>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSwitchDisabledComponent {
  model = true;
}
