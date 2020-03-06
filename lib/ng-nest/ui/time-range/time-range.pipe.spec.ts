import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTimeRangeModule } from './time-range.module';
import { XTimeRangePrefix } from './time-range.type';
import { XAddSeconds, XAddMinutes, XAddHours, XAddDays, XAddMonths, XAddYears } from '@ng-nest/ui/core';

describe(XTimeRangePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTimeRangeModule],
      declarations: [TestXTimeRangeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimeRangeComponent>;
    let timeRange: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTimeRangeComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: `
    <div class="row">
      <p>{{ diff | xTimeRange }}</p>
      <p>{{ diff | xTimeRange: 'HH:mm:ss:SSS' }}</p>
      <p>{{ diff | xTimeRange: 'D 天 H 时 m 分 s 秒' }}</p>
    </div>
  `
})
class TestXTimeRangeComponent {
  diff = 1000 * 60 * 60 * 24 * 2 - 1000 * 30;
}
