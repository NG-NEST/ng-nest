import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XSliderPrefix, XSliderNode } from './slider.property';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XSliderPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        XSliderComponent,
        XThemeComponent,
        BrowserAnimationsModule,
        XIconComponent,
        XTabsComponent,
        XTabComponent
      ],
      declarations: [TestXSliderComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSliderComponent>;
    let slider: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderComponent);
      fixture.detectChanges();
      slider = fixture.debugElement.query(By.directive(XSliderComponent));
    });
    it('should create.', () => {
      expect(slider).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-slider [data]="data"> </x-slider>
    </div>
    <div class="row">
      <x-slider [data]="data" justify="center"> </x-slider>
    </div>
    <div class="row">
      <x-slider [data]="data" justify="end"> </x-slider>
    </div>
    <div class="row">
      <x-slider [data]="data" activatedIndex="17"> </x-slider>
    </div>
    <div class="row">
      <x-slider [data]="data" layout="column"> </x-slider>
    </div>
    <div class="row" [style.height.rem]="10">
      <x-slider [data]="data" layout="column"> </x-slider>
    </div>
    <div class="row">
      <x-slider [data]="dataCustom" [nodeTpl]="nodeTpl"> </x-slider>
      <ng-template #nodeTpl let-node="$node">
        <div class="custom-node">
          <x-icon *ngIf="node.icon" [type]="node.icon"></x-icon>
          <span>{{ node.label }}</span>
        </div>
      </ng-template>
    </div>
    <div class="row">
      <x-slider [data]="data" size="big"> </x-slider>
      <x-slider [data]="data" size="large"> </x-slider>
      <x-slider [data]="data" size="medium"> </x-slider>
      <x-slider [data]="data" size="small"> </x-slider>
      <x-slider [data]="data" size="mini"> </x-slider>
    </div>
    <x-tabs>
      <x-tab label="1111">
        <x-slider [data]="data" size="large"> </x-slider>
      </x-tab>
      <x-tab label="2222">
        <x-slider [data]="data" size="large"> </x-slider>
      </x-tab>
      <x-tab label="3333">
        <x-slider [data]="data" size="large"> </x-slider>
      </x-tab>
    </x-tabs>
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
      .custom-node x-icon {
        margin-right: 0.125rem;
      }
    `
  ]
})
class TestXSliderComponent {
  data: XData<XSliderNode> = ['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻'];
  dataCustom: XData<XSliderNode> = [
    { label: '用户管理', icon: 'fto-box' },
    { label: '配置管理', icon: 'fto-settings' },
    '角色管理',
    '任务',
    '工作',
    '消息',
    '流程',
    '新闻'
  ];
}
