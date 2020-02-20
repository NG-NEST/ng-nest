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
      <x-calendar [data]="data" (rangeChange)="rangeChange($event)"></x-calendar>
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
    interval(0).subscribe(x => {
      this.cdr.detectChanges();
    });
  }

  rangeChange(range: Date[]) {
    let first = range[0].getTime();
    let last = range[1].getTime();
    let dt = {};
    let i = 0;
    while (true) {
      let rd = Math.floor(Math.random() * (last - first + 1)) + first;
      dt[this.pipeDate.transform(rd, "yyyy-MM-dd")] = [
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容1，处理内容1" },
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容2，处理内容2" },
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容3，处理内容3" },
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容4，处理内容4" },
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容5，处理内容5" },
        { label: this.pipeDate.transform(rd, "HH:mm "), value: "处理内容6，处理内容6" }
      ];
      i++;
      if (i === 10) break;
    }

    this.data = dt;
  }
}
