import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInputComponent } from "./nm-input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInputModule } from "./nm-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  prefix,
  NmInputLayoutEnum,
  NmInputTypeEnum,
  NmInputIconLayoutEnum
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
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmInputComponent));
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(prefix);
    });
    it("should disabled.", () => {
      testComponent.disabled = true;
      testComponent.value = "this value is disabled";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${prefix}-disabled`
      );
    });
    it("should required.", () => {
      testComponent.required = true;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${prefix}-required`
      );
    });
    it("should placeholder.", () => {
      const placeholder = "Please input";
      testComponent.placeholder = placeholder;
      fixture.detectChanges();
      let input = shadowRoot.querySelector("input");
      expect(input.placeholder).toContain(placeholder);
    });
    it("should label.", () => {
      const name = "name";
      testComponent.label = name;
      fixture.detectChanges();
      let label = shadowRoot.querySelector("label");
      expect(label.innerText).toContain(name);
    });
    it("should layout horizontal.", () => {
      testComponent.layout = NmInputLayoutEnum.Horizontal;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${prefix}-${NmInputLayoutEnum.Horizontal}`
      );
    });
    it("should layout vertical.", () => {
      testComponent.layout = NmInputLayoutEnum.Vertical;
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${prefix}-${NmInputLayoutEnum.Vertical}`
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
