import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { XTimeAgoPrefix } from './time-ago.property';
import { XAddSeconds, XAddMinutes, XAddHours, XAddDays, XAddMonths, XAddYears } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTimeAgoPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXTimeAgoComponent],
      imports: [XTimeAgoPipe, XButtonComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimeAgoComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTimeAgoComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <div class="row">
      <p>{{ date | date: format }}：{{ date | xTimeAgo }}</p>
      <p>{{ dateSecond | date: format }}：{{ dateSecond | xTimeAgo }}</p>
      <p>{{ dateMinute | date: format }}：{{ dateMinute | xTimeAgo }}</p>
      <p>{{ dateHours | date: format }}：{{ dateHours | xTimeAgo }}</p>
      <p>{{ dateDays | date: format }}：{{ dateDays | xTimeAgo }}</p>
      <p>{{ dateMonths | date: format }}：{{ dateMonths | xTimeAgo }}</p>
      <p>{{ dateYears | date: format }}：{{ dateYears | xTimeAgo }}</p>
    </div>
  `
})
class TestXTimeAgoComponent {
  format = 'yyyy-MM-dd HH:mm:ss';
  date = new Date();
  dateSecond = XAddSeconds(this.date, -5);
  dateMinute = XAddMinutes(this.date, -5);
  dateHours = XAddHours(this.date, -5);
  dateDays = XAddDays(this.date, -5);
  dateMonths = XAddMonths(this.date, -5);
  dateYears = XAddYears(this.date, -5);

  constructor(
    private i18nService: XI18nService,
    private cdr: ChangeDetectorRef
  ) {}

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
