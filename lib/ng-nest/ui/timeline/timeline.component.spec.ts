import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTimelineComponent } from '@ng-nest/ui/timeline';
import { XTimelinePrefix, XTimelineNode } from './timeline.property';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTimelinePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXTimelineComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        
        XTimelineComponent,
        XCardComponent,
        XTimeAgoPipe,
        XRadioComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimelineComponent>;
    let timeline: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTimelineComponent);
      fixture.detectChanges();
      timeline = fixture.debugElement.query(By.directive(XTimelineComponent));
    });
    it('should create.', () => {
      expect(timeline).toBeDefined();
    });
  });
});

@Component({
  template: `
    
    <div class="row">
      <x-card>
        <x-timeline [data]="data"></x-timeline>
      </x-card>
    </div>
    <div class="row">
      <x-card>
        <x-timeline [data]="dataType"></x-timeline>
      </x-card>
    </div>
    <div class="row">
      <x-card>
        <x-timeline [data]="dataIcon"></x-timeline>
      </x-card>
    </div>
    <div class="row">
      <x-card>
        <x-timeline [data]="dataColor"></x-timeline>
      </x-card>
    </div>
    <div class="row">
      <x-card>
        <x-timeline [data]="dataSize"></x-timeline>
      </x-card>
    </div>
    <div class="row">
      <x-timeline [data]="data" [wrapper]="wrapperTpl"></x-timeline>
      <ng-template #wrapperTpl let-node="$node">
        <div class="custom-wrapper">
          <span>{{ node.time | xTimeAgo }}</span>
          <x-card>
            <h4>{{ node.label }}</h4>
            <p>{{ node.content }}</p>
          </x-card>
        </div>
      </ng-template>
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
      .custom-wrapper > span {
        color: var(--x-text-400);
        display: inline-block;
        margin-bottom: 0.25rem;
      }
      .custom-wrapper h4 {
        margin: 0;
      }
      .custom-wrapper p {
        margin: 0;
      }
    `
  ]
})
class TestXTimelineComponent {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      time: XAddHours(this.now, -6)
    }
  ];
  dataType: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      time: XAddHours(this.now, -6)
    }
  ];
  dataIcon: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      icon: 'fto-user',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      icon: 'fto-user',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      icon: 'fto-user',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      icon: 'fto-user',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      icon: 'fto-user',
      time: XAddHours(this.now, -6)
    }
  ];
  dataColor: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      icon: 'fto-user',
      color: 'black',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      icon: 'fto-user',
      color: 'red',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      icon: 'fto-user',
      color: 'blue',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      icon: 'fto-user',
      color: 'rgba(51, 51, 51, 0.72)',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      icon: 'fto-user',
      color: '#ffff00',
      time: XAddHours(this.now, -6)
    }
  ];
  dataSize: XTimelineNode[] = [
    {
      label: '新增请假',
      content: '李三 请假时间 2020-2-23 至 2020-3-1',
      type: 'primary',
      icon: 'fto-user',
      size: 'large',
      time: XAddDays(this.now, -3)
    },
    {
      label: '主管审批',
      content: '王斯 已批准',
      type: 'success',
      icon: 'fto-user',
      size: 'medium',
      time: XAddDays(this.now, -2)
    },
    {
      label: '申请人销假',
      content: '李三 销假',
      type: 'warning',
      icon: 'fto-user',
      size: 'small',
      time: XAddDays(this.now, -1)
    },
    {
      label: '人事复核',
      content: '汪清 复核通过',
      type: 'danger',
      icon: 'fto-user',
      size: 'mini',
      time: XAddHours(this.now, -12)
    },
    {
      label: '结束',
      content: '',
      type: 'info',
      icon: 'fto-user',
      time: XAddHours(this.now, -6)
    }
  ];
}
