import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInputComponent } from "./nm-input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInputModule } from "./nm-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  InputPrefix,
  NmInputLayoutEnum,
  NmInputTypeEnum,
  NmInputIconLayoutEnum
} from "./nm-input.type";

describe(InputPrefix, () => {
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
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmInputComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(InputPrefix);
    });
    it("should disabled.", () => {
      testComponent.disabled = true;
      testComponent.value = "this value is disabled";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-disabled`);
    });
    it("should required.", () => {
      testComponent.required = true;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-required`);
    });
    it("should placeholder.", () => {
      const placeholder = "Please input";
      testComponent.placeholder = placeholder;
      fixture.detectChanges();
      let input = element.querySelector("input");
      expect(input.placeholder).toContain(placeholder);
    });
    it("should label.", () => {
      const name = "name";
      testComponent.label = name;
      fixture.detectChanges();
      let label = element.querySelector("label");
      expect(label.innerText).toContain(name);
    });
    it("should layout horizontal.", () => {
      testComponent.layout = NmInputLayoutEnum.Horizontal;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${InputPrefix}-${NmInputLayoutEnum.Horizontal}`
      );
    });
    it("should layout vertical.", () => {
      testComponent.layout = NmInputLayoutEnum.Vertical;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${InputPrefix}-${NmInputLayoutEnum.Vertical}`
      );
    });
    it("should icon left.", () => {
      testComponent.icon = "ado-search";
      testComponent.iconLayout = NmInputIconLayoutEnum.Left;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${InputPrefix}-icon-${NmInputIconLayoutEnum.Left}`
      );
    });
    it("should icon right.", () => {
      testComponent.icon = "ado-search";
      testComponent.iconLayout = NmInputIconLayoutEnum.Right;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${InputPrefix}-icon-${NmInputIconLayoutEnum.Right}`
      );
    });
  });
});

@Component({
  selector: "test-nm-input",
  template: `
    <nm-input
      [nmLayout]="layout"
      [nmLabel]="label"
      [nmType]="type"
      [nmPlaceholder]="placeholder"
      [nmRequired]="required"
      [nmDisabled]="disabled"
      [nmIcon]="icon"
      [nmIconLayout]="iconLayout"
      [(ngModel)]="value"
    ></nm-input>
  `
})
class TestNmInputComponent {
  layout?: NmInputLayoutEnum;
  label?: string;
  type?: NmInputTypeEnum;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  iconLayout?: NmInputIconLayoutEnum;
  value?: string | number;
}
