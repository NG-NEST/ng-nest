import { XIconModule } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCollapseComponent } from './collapse.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { FormsModule } from '@angular/forms';
import { XCollapsePrefix } from './collapse.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XCollapsePrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        XThemeModule,
        FormsModule,
        BrowserAnimationsModule,
        XCollapseModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XIconModule
      ],
      declarations: [TestXCollapseComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCollapseComponent>;
    let collapse: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCollapseComponent);
      fixture.detectChanges();
      collapse = fixture.debugElement.query(By.directive(XCollapseComponent));
    });
    it('should create.', () => {
      expect(collapse).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-collapse>
        <x-collapse-panel label="一致性 Consistency" active>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </x-collapse-panel>
        <x-collapse-panel label="反馈 Feedback" active>
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </x-collapse-panel>
        <x-collapse-panel label="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </x-collapse-panel>
        <x-collapse-panel label="可控 Controllability">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </x-collapse-panel>
      </x-collapse>
    </div>
    <div class="row">
      <x-collapse accordion>
        <x-collapse-panel label="一致性 Consistency" active>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </x-collapse-panel>
        <x-collapse-panel label="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </x-collapse-panel>
        <x-collapse-panel label="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </x-collapse-panel>
        <x-collapse-panel label="可控 Controllability">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </x-collapse-panel>
      </x-collapse>
    </div>
    <div class="row">
      <x-collapse accordion>
        <x-collapse-panel [label]="labelTmpOne" active>
          <ng-template #labelTmpOne> <x-icon type="fto-home"></x-icon> 一致性 </ng-template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </x-collapse-panel>
        <x-collapse-panel [label]="labelTmpTwo">
          <ng-template #labelTmpTwo> <x-icon type="fto-heart"></x-icon> 反馈 </ng-template>
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </x-collapse-panel>
        <x-collapse-panel label="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </x-collapse-panel>
        <x-collapse-panel label="可控 Controllability">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </x-collapse-panel>
      </x-collapse>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        width: 24rem;
        padding: 1.625rem 1rem;
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
    `
  ]
})
class TestXCollapseComponent {}
