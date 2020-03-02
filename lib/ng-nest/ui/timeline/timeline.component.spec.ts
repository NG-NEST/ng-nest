import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XTimelineComponent } from "./timeline.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XTimelineModule } from "./timeline.module";
import { XTimelinePrefix, XTimelineNode } from "./timeline.type";
import { XAddDays, XAddHours } from "@ng-nest/ui/core";
import { XCardModule } from "@ng-nest/ui/card";
import { XTimeAgoModule } from "@ng-nest/ui/time-ago";

describe(XTimelinePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTimelineModule, XCardModule, XTimeAgoModule],
      declarations: [TestXTimelineComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTimelineComponent>;
    let timeline: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTimelineComponent);
      fixture.detectChanges();
      timeline = fixture.debugElement.query(By.directive(XTimelineComponent));
    });
    it("should create.", () => {
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
      label: "新增请假",
      content: "李三 请假时间 2020-2-23 至 2020-3-1",
      time: XAddDays(this.now, -3)
    },
    {
      label: "主管审批",
      content: "王斯 已批准",
      time: XAddDays(this.now, -2)
    },
    {
      label: "申请人销假",
      content: "李三 销假",
      time: XAddDays(this.now, -1)
    },
    {
      label: "人事复核",
      content: "汪清 复核通过",
      time: XAddHours(this.now, -12)
    },
    {
      label: "结束",
      content: "",
      time: XAddHours(this.now, -6)
    }
  ];
  dataType: XTimelineNode[] = [
    {
      label: "新增请假",
      content: "李三 请假时间 2020-2-23 至 2020-3-1",
      type: "primary",
      time: XAddDays(this.now, -3)
    },
    {
      label: "主管审批",
      content: "王斯 已批准",
      type: "success",
      time: XAddDays(this.now, -2)
    },
    {
      label: "申请人销假",
      content: "李三 销假",
      type: "warning",
      time: XAddDays(this.now, -1)
    },
    {
      label: "人事复核",
      content: "汪清 复核通过",
      type: "danger",
      time: XAddHours(this.now, -12)
    },
    {
      label: "结束",
      content: "",
      type: "info",
      time: XAddHours(this.now, -6)
    }
  ];
  dataIcon: XTimelineNode[] = [
    {
      label: "新增请假",
      content: "李三 请假时间 2020-2-23 至 2020-3-1",
      type: "primary",
      icon: "fto-user",
      time: XAddDays(this.now, -3)
    },
    {
      label: "主管审批",
      content: "王斯 已批准",
      type: "success",
      icon: "fto-user",
      time: XAddDays(this.now, -2)
    },
    {
      label: "申请人销假",
      content: "李三 销假",
      type: "warning",
      icon: "fto-user",
      time: XAddDays(this.now, -1)
    },
    {
      label: "人事复核",
      content: "汪清 复核通过",
      type: "danger",
      icon: "fto-user",
      time: XAddHours(this.now, -12)
    },
    {
      label: "结束",
      content: "",
      type: "info",
      icon: "fto-user",
      time: XAddHours(this.now, -6)
    }
  ];
  dataColor: XTimelineNode[] = [
    {
      label: "新增请假",
      content: "李三 请假时间 2020-2-23 至 2020-3-1",
      icon: "fto-user",
      color: "black",
      time: XAddDays(this.now, -3)
    },
    {
      label: "主管审批",
      content: "王斯 已批准",
      icon: "fto-user",
      color: "red",
      time: XAddDays(this.now, -2)
    },
    {
      label: "申请人销假",
      content: "李三 销假",
      icon: "fto-user",
      color: "blue",
      time: XAddDays(this.now, -1)
    },
    {
      label: "人事复核",
      content: "汪清 复核通过",
      icon: "fto-user",
      color: "rgba(51, 51, 51, 0.72)",
      time: XAddHours(this.now, -12)
    },
    {
      label: "结束",
      content: "",
      icon: "fto-user",
      color: "#ffff00",
      time: XAddHours(this.now, -6)
    }
  ];
  dataSize: XTimelineNode[] = [
    {
      label: "新增请假",
      content: "李三 请假时间 2020-2-23 至 2020-3-1",
      type: "primary",
      icon: "fto-user",
      size: "large",
      time: XAddDays(this.now, -3)
    },
    {
      label: "主管审批",
      content: "王斯 已批准",
      type: "success",
      icon: "fto-user",
      size: "medium",
      time: XAddDays(this.now, -2)
    },
    {
      label: "申请人销假",
      content: "李三 销假",
      type: "warning",
      icon: "fto-user",
      size: "small",
      time: XAddDays(this.now, -1)
    },
    {
      label: "人事复核",
      content: "汪清 复核通过",
      type: "danger",
      icon: "fto-user",
      size: "mini",
      time: XAddHours(this.now, -12)
    },
    {
      label: "结束",
      content: "",
      type: "info",
      icon: "fto-user",
      time: XAddHours(this.now, -6)
    }
  ];
}
