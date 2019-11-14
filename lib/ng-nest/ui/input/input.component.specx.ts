import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XInputComponent } from "./input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XInputModule } from "./input.module";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import {
  InputPrefix,
  XInputLayoutType,
  XInputType,
  XInputIconLayoutType
} from "./input.type";

describe(InputPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInputModule, FormsModule, ReactiveFormsModule],
      declarations: [TestXInputComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputComponent>;
    let testComponent: TestXInputComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputComponent));
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
      testComponent.layout = "horizontal";
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-horizontal`);
    });
    it("should layout vertical.", () => {
      testComponent.layout = "vertical";
      testComponent.label = "name";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-vertical`);
    });
    it("should icon left.", () => {
      testComponent.icon = "ado-search";
      testComponent.iconLayout = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-icon-left`);
    });
    it("should icon right.", () => {
      testComponent.icon = "ado-search";
      testComponent.iconLayout = "right";
      fixture.detectChanges();
      expect(element.classList).toContain(`${InputPrefix}-icon-right`);
    });
  });
});

@Component({
  selector: "test-x-input",
  template: `
    <x-input
      [layout]="layout"
      [label]="label"
      [type]="type"
      [placeholder]="placeholder"
      [required]="required"
      [disabled]="disabled"
      [icon]="icon"
      [iconLayout]="iconLayout"
      [formControl]="ctr"
    ></x-input>
    <button (click)="getCtr()">获取</button>
  `
})
class TestXInputComponent {
  layout?: XInputLayoutType;
  label?: string;
  type?: XInputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  iconLayout?: XInputIconLayoutType;
  value?: string | number;
  ctr = new FormControl("123");

  getCtr() {
    setTimeout(
      () => this.ctr.setValue("23123"),
      2000
    );
  }
}
