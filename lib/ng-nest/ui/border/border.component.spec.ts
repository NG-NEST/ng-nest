import { XDocModule } from '@ng-nest/ui/doc';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XBorderComponent } from './border.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XBorderModule } from '@ng-nest/ui/border';
import { XBorderPrefix } from './border.property';
import { XThemeModule } from '@ng-nest/ui/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XBorderPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XBorderModule, XLayoutModule, XDocModule],
      declarations: [TestXBorderComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXBorderComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXBorderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XBorderComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-border',
  template: `
    <x-theme showDark></x-theme>
    <x-border></x-border>
    <x-doc>
      <x-row space="1">
        <x-col span="24">
          <table class="type">
            <tr>
              <th width="100">名称</th>
              <th width="250">样式名</th>
              <th>显示</th>
            </tr>
            <tr>
              <td>实线</td>
              <td>border: 0.0625rem solid #f2f6fc;</td>
              <td><div class="solid"></div></td>
            </tr>
            <tr>
              <td>虚线</td>
              <td>border: 0.0625rem dashed #f2f6fc;</td>
              <td><div class="dashed"></div></td>
            </tr>
          </table>
        </x-col>
      </x-row>
      <x-row space="2">
        <x-col span="24">
          <table class="radio">
            <tr>
              <th width="100">名称</th>
              <th width="250">样式名</th>
              <th>显示</th>
            </tr>
            <tr>
              <td>无圆角</td>
              <td>border-radius: 0;</td>
              <td>
                <div></div>
              </td>
            </tr>
            <tr>
              <td>小圆角</td>
              <td>border-radius: 0.125rem;</td>
              <td>
                <div [style.border-radius.rem]="0.125"></div>
              </td>
            </tr>
            <tr>
              <td>大圆角</td>
              <td>border-radius: 0.25rem;</td>
              <td>
                <div [style.border-radius.rem]="0.25"></div>
              </td>
            </tr>
            <tr>
              <td>圆形圆角</td>
              <td>border-radius: 1.5rem;</td>
              <td>
                <div [style.border-radius.rem]="1.5"></div>
              </td>
            </tr>
          </table>
        </x-col>
      </x-row>
      <x-row space="2">
        <x-col span="24">
          <table class="box-shadow">
            <tr>
              <th width="100">名称</th>
              <th width="250">样式名</th>
              <th>显示</th>
            </tr>
            <tr>
              <td>基础投影</td>
              <td>box-shadow: 0 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.06);</td>
              <td>
                <div [style.box-shadow]="'0 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.06)'"></div>
              </td>
            </tr>
            <tr>
              <td>浅色投影</td>
              <td>box-shadow: 0 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.04);</td>
              <td>
                <div [style.box-shadow]="'0 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.04)'"></div>
              </td>
            </tr>
          </table>
        </x-col>
      </x-row>
    </x-doc>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      table.radio > tr > td > div {
        width: 100%;
      }
      div.solid {
        border-top: 0.0625rem solid var(--x-border);
      }
      div.dashed {
        border-top: 0.0625rem dashed var(--x-border);
      }
      table.radio > tr > td > div,
      table.box-shadow > tr > td > div {
        width: 100%;
        height: 3rem;
        border: 0.0625rem solid var(--x-border);
      }
      .box-shadow {
      }
    `
  ]
})
class TestXBorderComponent {}
