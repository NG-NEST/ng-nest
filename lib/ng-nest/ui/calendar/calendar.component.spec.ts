import { XIconModule } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XCalendarModule, XCalendarComponent } from '@ng-nest/ui/calendar';
import { FormsModule } from '@angular/forms';
import { XCalendarPrefix, XCalendarData } from './calendar.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XCalendarPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        XCalendarModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XIconModule
      ],
      declarations: [TestXCalendarComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCalendarComponent>;
    let calendar: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCalendarComponent);
      fixture.detectChanges();
      calendar = fixture.debugElement.query(By.directive(XCalendarComponent));
    });
    it('should create.', () => {
      expect(calendar).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <x-theme showDark></x-theme>
    <div class="row">
      <x-calendar [data]="data" (rangeChange)="rangeChange($event)"></x-calendar>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [DatePipe]
})
class TestXCalendarComponent {
  data: XCalendarData = {};
  constructor(private i18nService: XI18nService, private cdr: ChangeDetectorRef, private pipeDate: DatePipe) {
    interval(0).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  rangeChange(range: Date[]) {
    let first = range[0].getTime();
    let last = range[1].getTime();
    let dt: { [property: string]: { id: string | null; label: string }[] } = {};
    let i = 0;
    while (true) {
      let rd = Math.floor(Math.random() * (last - first + 1)) + first;
      dt[this.pipeDate.transform(rd, 'yyyy-MM-dd') as string] = [
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容1，处理内容1' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容2，处理内容2' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容3，处理内容3' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容4，处理内容4' }
      ];
      i++;
      if (i === 10) break;
    }

    this.data = dt;
  }

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
