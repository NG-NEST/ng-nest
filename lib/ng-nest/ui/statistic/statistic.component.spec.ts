import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XStatisticComponent, XCountdownComponent } from '@ng-nest/ui/statistic';
import { FormsModule } from '@angular/forms';
import { XStatisticPrefix } from './statistic.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { XCardComponent } from '@ng-nest/ui/card';
import { XAddDays } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XStatisticPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXStatisticComponent],
      imports: [
        BrowserAnimationsModule,
        
        FormsModule,
        XStatisticComponent,
        XCountdownComponent,
        XButtonComponent,
        XCardComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
        XIconComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXStatisticComponent>;
    let statistic: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXStatisticComponent);
      fixture.detectChanges();
      statistic = fixture.debugElement.query(By.directive(XStatisticComponent));
    });
    it('should create.', () => {
      expect(statistic).toBeDefined();
    });
  });
});

@Component({
  template: `
    
    <x-row space="1">
      <x-col span="12">
        <x-card>
          <x-statistic label="在线人数" value="{{ 2981231 | number }}"> </x-statistic>
        </x-card>
      </x-col>
      <x-col span="12">
        <x-card>
          <x-statistic label="销售总额（CNY）" value="{{ 1023123.122 | number: '1.0-2' }}"> </x-statistic>
        </x-card>
      </x-col>
      <x-col span="12">
        <x-card>
          <x-statistic
            label="上升比例"
            value="{{ 15.28 | number: '1.0-2' }}"
            [prefix]="prefixTempOne"
            suffix="%"
            [valueStyle]="{ color: '#67c23a' }"
          >
          </x-statistic>
          <ng-template #prefixTempOne><x-icon type="fto-chevrons-up"></x-icon></ng-template>
        </x-card>
      </x-col>
      <x-col span="12">
        <x-card>
          <x-statistic
            label="下降比例"
            value="{{ 2.28 | number: '1.0-2' }}"
            [prefix]="prefixTempTwo"
            suffix="%"
            [valueStyle]="{ color: '#f56c6c' }"
          >
          </x-statistic>
          <ng-template #prefixTempTwo><x-icon type="fto-chevrons-down"></x-icon></ng-template>
        </x-card>
      </x-col>
      <x-col span="12">
        <x-card>
          <x-countdown [value]="deadline" label="倒计时"></x-countdown>
        </x-card>
      </x-col>
      <x-col span="12">
        <x-card>
          <x-countdown [value]="deadline" label="倒计时（毫秒）" format="HH:mm:ss:SSS"></x-countdown>
        </x-card>
      </x-col>
      <x-col span="24">
        <x-card>
          <x-countdown [value]="deadline" label="倒计时（天）" format="D 天 H 时 m 分 s 秒"></x-countdown>
        </x-card>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
      x-row x-col {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    `
  ]
})
class TestXStatisticComponent {
  deadline = XAddDays(new Date(), 2).getTime();
}
