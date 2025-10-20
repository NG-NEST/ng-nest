import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { XTimeRangePipe } from '@ng-nest/ui/time-range';
import { XTimeRangePrefix } from './time-range.property';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe(XTimeRangePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestXTimeRangeComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimeRangeComponent>;
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
  imports: [XTimeRangePipe],
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
