import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInputComponent } from "./nm-input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInputModule } from "./nm-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  prefix,
  InputLayoutEnum,
  InputTypeEnum,
  InputIconLayoutEnum
} from "./nm-input.type";

describe(prefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmInputModule, FormsModule, ReactiveFormsModule],
      declarations: [TestNmInputComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmInputComponent>;
    let testComponent: TestNmInputComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmInputComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList).toContain(prefix);
    });
    it("should disabled.", () => {
      testComponent.disabled = true;
      testComponent.value = "this value is disabled";
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList).toContain(
        `${prefix}-disabled`
      );
    });
    it("should required.", () => {
      testComponent.required = true;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList).toContain(
        `${prefix}-required`
      );
    });
    it("should placeholder.", () => {
      const placeholder = "Please input";
      testComponent.placeholder = placeholder;
      fixture.detectChanges();
      let input = debugElement.nativeElement.querySelector("input");
      expect(input.placeholder).toContain(placeholder);
    });
    it("should label.", () => {
      const name = "name";
      testComponent.label = name;
      fixture.detectChanges();
      let label = debugElement.nativeElement.querySelector("label");
      expect(label.innerText).toContain(name);
    });
    it("should layout horizontal.", () => {
      testComponent.layout = InputLayoutEnum.Horizontal;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList).toContain(
        `${prefix}-horizontal`
      );
    });
    it("should layout vertical.", () => {
      testComponent.layout = InputLayoutEnum.Vertical;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList).toContain(
        `${prefix}-vertical`
      );
    });
  });
});

@Component({
  selector: "test-nm-input",
  template: `
    <nm-input
      [layout]="layout"
      [label]="label"
      [type]="type"
      [placeholder]="placeholder"
      [required]="required"
      [disabled]="disabled"
      [icon]="icon"
      [iconLayout]="iconLayout"
      [(ngModel)]="value"
    ></nm-input>
  `
})
class TestNmInputComponent {
  layout?: InputLayoutEnum;
  label?: string;
  type?: InputTypeEnum;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  iconLayout?: InputIconLayoutEnum;
  value?: string | number;
}
