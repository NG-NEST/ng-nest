import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XCalendarComponent } from "./calendar.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCalendarModule } from "./calendar.module";
import { FormsModule } from "@angular/forms";
import { XCalendarPrefix, XCalendarData } from "./calendar.type";
import { XButtonModule } from "@ng-nest/ui/button";
import { XContainerModule } from "@ng-nest/ui/container";
import { interval } from "rxjs";
import { DatePipe } from "@angular/common";

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
      <x-calendar [data]="data"></x-calendar>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [DatePipe]
})
class TestXCalendarComponent {
  data: XCalendarData = {};
  constructor(private cdr: ChangeDetectorRef, private pipeDate: DatePipe) {
    let now = new Date();
    this.data[this.pipeDate.transform(now, "yyyy-MM-dd")] = [
      { label: "8:30：", value: "晨会" },
      { label: "9:30：", value: "需求会议" }
    ];
    interval(0).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
