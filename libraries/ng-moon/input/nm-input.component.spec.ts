import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInputComponent } from "./nm-input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInputModule } from "./nm-input.module";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import {
  InputPrefix,
  NmInputLayoutType,
  NmInputType,
  NmInputIconLayoutType
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
      [formControl]="ctr"
    ></nm-input>
    <button (click)="getCtr()">获取</button>
  `
})
class TestNmInputComponent {
  layout?: NmInputLayoutType;
  label?: string;
  type?: NmInputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  iconLayout?: NmInputIconLayoutType;
  value?: string | number;
  ctr = new FormControl("123");

  getCtr() {
    console.log(this.ctr);
    setTimeout(
      () => this.ctr.setValue("23123"),
      2000
    );
  }
}
