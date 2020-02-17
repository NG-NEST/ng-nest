import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XCalendarComponent } from "./calendar.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCalendarModule } from "./calendar.module";
import { FormsModule } from "@angular/forms";
import { XCalendarPrefix } from "./calendar.type";
import { XButtonModule } from "@ng-nest/ui/button";
import { XContainerModule } from "@ng-nest/ui/container";
import { interval } from "rxjs";

describe(XCalendarPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XCalendarModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXCalendarComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCalendarComponent>;
    let calendar: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCalendarComponent);
      fixture.detectChanges();
      calendar = fixture.debugElement.query(By.directive(XCalendarComponent));
    });
    it("should create.", () => {
      expect(calendar).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-calendar></x-calendar>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCalendarComponent {
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
