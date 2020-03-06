import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XProgressComponent } from './progress.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XProgressModule } from './progress.module';
import { FormsModule } from '@angular/forms';
import { XProgressPrefix } from './progress.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XProgressPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XProgressModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXProgressComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXProgressComponent>;
    let progress: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXProgressComponent);
      fixture.detectChanges();
      progress = fixture.debugElement.query(By.directive(XProgressComponent));
    });
    it('should create.', () => {
      expect(progress).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-progress percent="30"></x-progress>
      <x-progress percent="50" status="active"></x-progress>
      <x-progress percent="70" status="exception"></x-progress>
      <x-progress percent="100" status="warning"></x-progress>
      <x-progress percent="100" status="success"></x-progress>
      <x-progress percent="80" info="false"></x-progress>
    </div>
    <div class="row">
      <x-progress percent="30" [format]="format"></x-progress>
      <x-progress percent="100" [format]="format"></x-progress>
    </div>
    <div class="row">
      <x-progress inside height="1.5rem" percent="30"></x-progress>
      <x-progress inside height="1.5rem" percent="50" status="active"></x-progress>
      <x-progress inside height="1.5rem" percent="70" status="exception"></x-progress>
      <x-progress inside height="1.5rem" percent="100" status="warning"></x-progress>
      <x-progress inside height="1.5rem" percent="100" status="success"></x-progress>
    </div>
    <div class="row">
      <x-progress [percent]="percent" [color]="color"></x-progress>
      <x-progress [percent]="percent" [color]="colors"></x-progress>
      <x-progress [percent]="percent" [color]="colorFunc"></x-progress>
      <x-buttons>
        <x-button icon="fto-minus" (click)="plus(-10)"></x-button>
        <x-button icon="fto-plus" (click)="plus(10)"></x-button>
      </x-buttons>
    </div>
  `,
  styles: [
    `
      .row {
        padding: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-progress:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXProgressComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  format(percent) {
    return percent === 100 ? '已完成' : `加载中${percent}%`;
  }
  percent = 10;
  color: '#3f51b5';
  colors = [
    { color: '#f56c6c', percent: 20 },
    { color: '#e6a23c', percent: 40 },
    { color: '#5cb87a', percent: 60 },
    { color: '#1989fa', percent: 80 },
    { color: '#6f7ad3', percent: 100 }
  ];
  colorFunc(percent) {
    if (percent < 30) {
      return '#909399';
    } else if (percent < 70) {
      return '#e6a23c';
    } else {
      return '#67c23a';
    }
  }
  plus(num) {
    if ((this.percent === 0 && num === -10) || (this.percent === 100 && num === 10)) return;
    this.percent = this.percent + num;
    this.cdr.detectChanges();
  }
}
