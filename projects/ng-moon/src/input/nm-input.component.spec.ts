import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInputComponent } from "./nm-input.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInputModule } from "./nm-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputOption, InputSizeEnum, prefix } from "./nm-input.type";

describe(prefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmInputModule, FormsModule, ReactiveFormsModule],
      declarations: [TestNmInputComponent]
    }).compileComponents();
  }));
  describe(`default`, () => {
    let fixture: ComponentFixture<TestNmInputComponent>;
    let testComponent: TestNmInputComponent;
    let inputElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NmInputComponent));
    });
    it("should create", () => {
      expect(inputElement).toBeDefined();
    });
    it("should className", () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain(prefix);
    });
    it("should disabled", () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain(
        `${prefix}-disabled`
      );
    });
    it("should placeholder", () => {
      const placeholder = "Please input";
      testComponent.placeholder = placeholder;
      // testComponent.
      fixture.detectChanges();
      console.log(inputElement)
    });
  });
});

@Component({
  selector: "test-nm-input",
  template: `
    <nm-input [disabled]="disabled" [placeholder]="placeholder"></nm-input>
  `
})
class TestNmInputComponent {
  disabled: boolean;
  placeholder: string;
}
