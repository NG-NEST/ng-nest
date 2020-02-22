import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XTimeAgoModule } from "./time-ago.module";
import { XTimeAgoPrefix } from "./time-ago.type";
import { XAddSeconds, XAddMinutes, XAddHours, XAddDays, XAddMonths, XAddYears } from "@ng-nest/ui/core";

describe(XTimeAgoPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTimeAgoModule],
      declarations: [TestXTimeAgoComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimeAgoComponent>;
    let timeAgo: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTimeAgoComponent);
      fixture.detectChanges();
    });
    it("should create.", () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: `
    <div class="row">
      <p>{{ date | date: format }}：{{ date | XTimeAgo }}</p>
      <p>{{ dateSecond | date: format }}：{{ dateSecond | XTimeAgo }}</p>
      <p>{{ dateMinute | date: format }}：{{ dateMinute | XTimeAgo }}</p>
      <p>{{ dateHours | date: format }}：{{ dateHours | XTimeAgo }}</p>
      <p>{{ dateDays | date: format }}：{{ dateDays | XTimeAgo }}</p>
      <p>{{ dateMonths | date: format }}：{{ dateMonths | XTimeAgo }}</p>
      <p>{{ dateYears | date: format }}：{{ dateYears | XTimeAgo }}</p>
    </div>
  `
})
class TestXTimeAgoComponent {
  format = "yyyy-MM-dd HH:mm:ss";
  date = new Date();
  dateSecond = XAddSeconds(this.date, -5);
  dateMinute = XAddMinutes(this.date, -5);
  dateHours = XAddHours(this.date, -5);
  dateDays = XAddDays(this.date, -5);
  dateMonths = XAddMonths(this.date, -5);
  dateYears = XAddYears(this.date, -5);
}
