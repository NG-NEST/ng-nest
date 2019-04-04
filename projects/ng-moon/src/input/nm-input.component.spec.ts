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
    it("should className", () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain(prefix);
    });
    it("should disabled", () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).not.toContain(
        `${prefix}-disabled`
      );
      testComponent.option.disabled = true;
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain(
        `${prefix}-disabled`
      );
    });
    it("should placeholder", () => {
      const placeholder = "please input";
      // testComponent.
      fixture.detectChanges();
      //inputElement.nativeElement.classList
    });
  });
});

@Component({
  selector: "test-nm-input",
  template: `
    <nm-input [(option)]="option"></nm-input>
  `
})
class TestNmInputComponent {
  option: InputOption = {};
}
