import { XDocModule } from '@ng-nest/ui/doc';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XBorderComponent } from './border.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XBorderModule } from './border.module';
import { XBorderPrefix } from './border.type';

describe(XBorderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XBorderModule, XFenceModule, XDocModule],
      declarations: [TestXBorderComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXBorderComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXBorderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XBorderComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-border',
  template: `
    <x-border></x-border>
    <x-doc>
      <x-row space="1">
        <x-col span="24">
          <table>
            <tr>
              <th width="100">名称</th>
              <th width="100">粗细</th>
              <th>显示</th>
            </tr>
            <tr>
              <td>实线</td>
              <td>0.0625rem</td>
              <td><div class="solid"></div></td>
            </tr>
            <tr>
              <td>虚线</td>
              <td>0.0625rem</td>
              <td><div class="dashed"></div></td>
            </tr>
          </table>
        </x-col>
      </x-row>
      <x-row space="2">
        <x-col span="6">
          <div class="box">
            <span>无圆角</span>
            <span class="value">border-radius: 0</span>
            <div></div>
          </div>
        </x-col>
        <x-col span="6">
          <div class="box">
            <span>小圆角</span>
            <span class="value">border-radius: 0.125rem</span>
            <div [style.border-radius.rem]="0.125"></div>
          </div>
        </x-col>
        <x-col span="6">
          <div class="box">
            <span>大圆角</span>
            <span class="value">border-radius: 0.25rem</span>
            <div [style.border-radius.rem]="0.25"></div>
          </div>
        </x-col>
        <x-col span="6">
          <div class="box">
            <span>圆形圆角</span>
            <span class="value">border-radius: 3rem</span>
            <div [style.border-radius.rem]="3"></div>
          </div>
        </x-col>
      </x-row>
      <x-row space="2">
        <x-col span="24">
          <div class="box">
            <span>基础投影</span>
            <span class="value">box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.04)</span>
            <div class="shadow" [style.border-radius.rem]="0.125"></div>
          </div>
        </x-col>
        <x-col span="24">
          <div class="box">
            <span>浅色投影</span>
            <span class="value">box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)</span>
            <div class="shadow-light" [style.border-radius.rem]="0.125"></div>
          </div>
        </x-col>
      </x-row>
    </x-doc>
  `,
  styles: [
    `
      table > tr > td > div {
        width: 100%;
        height: 0;
      }
      div.solid {
        border-top: 0.0625rem solid var(--x-border);
      }
      div.dashed {
        border-top: 0.0625rem dashed var(--x-border);
      }
      div.box span {
        display: block;
        line-height: 1.7;
        font-size: 1rem;
      }
      div.box span.value {
        font-size: 0.825rem;
      }
      div.box > div {
        border: 0.0625rem solid var(--x-border);
        height: 3.25rem;
        margin-top: 1rem;
      }
      div.box > div.shadow {
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.04);
      }
      div.box > div.shadow-light {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    `
  ]
})
class TestXBorderComponent {}
