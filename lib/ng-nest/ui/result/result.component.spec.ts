import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XResultComponent } from './result.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XResultModule } from '@ng-nest/ui/result';
import { FormsModule } from '@angular/forms';
import { XResultPrefix } from './result.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XResultPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XResultModule, XButtonModule, XContainerModule, XLayoutModule, XIconModule],
      declarations: [TestXResultComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXResultComponent>;
    let result: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXResultComponent);
      fixture.detectChanges();
      result = fixture.debugElement.query(By.directive(XResultComponent));
    });
    it('should create.', () => {
      expect(result).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-result
        status="success"
        title="成功购买云服务器！"
        subTitle="订单号：2020031413092700001，云服务器配置需要1-5分钟，请稍候。"
      >
        <x-buttons space="2">
          <x-button type="primary">返回列表</x-button>
          <x-button>再次购买</x-button>
        </x-buttons>
      </x-result>
    </div>
    <div class="row">
      <x-result title="您的操作已经被执行！">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result title="您的操作有一些问题！" status="warning">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result status="403" title="403" subTitle="抱歉，您无权访问此页。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result status="404" title="404" subTitle="抱歉，您访问的页面不存在。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result status="500" title="500" subTitle="抱歉，服务端发生错误。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result status="error" title="订单提交失败" subTitle="请在重新提交之前检查并修改以下信息。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result icon="fto-smile" status="success" title="自定义图标" subTitle="感谢您参与我们的调查。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
    </div>
    <div class="row">
      <x-result [icon]="iconTpl" title="404" subTitle="抱歉，访问的页面不存在。">
        <x-button type="primary">返回列表</x-button>
      </x-result>
      <ng-template #iconTpl>
        <img
          [style.width.rem]="18"
          src="https://ngnest.com/assets/img/logo/logo-144x144.png"
        />
      </ng-template>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 2rem;
      }
    `
  ]
})
class TestXResultComponent {}
