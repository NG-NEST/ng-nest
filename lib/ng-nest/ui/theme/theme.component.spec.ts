import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XThemeComponent } from './theme.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XThemePrefix } from './theme.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XControl, XFormRow } from '@ng-nest/ui/form';

describe(XThemePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XLayoutModule],
      declarations: [TestXThemeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXThemeComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXThemeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XThemeComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-theme',
  template: `
    <x-row space="1">
      <x-col span="12"><x-theme></x-theme></x-col>
      <x-col span="24">
        <x-form [controls]="controls" direction="row" labelSuffix=":" width="10rem" labelWidth="5rem" labelAlign="end" span="20"></x-form>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row:first-child {
        margin-top: 0;
      }
      x-row:last-child {
        margin-bottom: 0;
      }
      x-theme.border {
        border: 1px solid var(--x-border);
      }
      x-theme.black {
        color: var(--x-text);
      }
    `
  ]
})
class TestXThemeComponent {
  controls: XFormRow[] = [
    {
      title: '主色',
      controls: [{ control: 'color-picker', id: 'primary', label: '主色' }]
    },
    {
      title: '背景色',
      controls: [
        { control: 'color-picker', id: 'background', label: '基础背景色' },
        { control: 'color-picker', id: 'background-', label: '基础背景色' },
        { control: 'color-picker', id: 'background', label: '基础背景色' },
        { control: 'color-picker', id: 'background', label: '基础背景色' }
      ]
    },
    {
      title: '辅助色',
      controls: [
        { control: 'color-picker', id: 'success', label: '成功' },
        { control: 'color-picker', id: 'warning', label: '警告' },
        { control: 'color-picker', id: 'danger', label: '危险' },
        { control: 'color-picker', id: 'info', label: '信息' }
      ]
    },
    {
      title: '中性色',
      controls: [
        { control: 'color-picker', id: 'text', label: '主要文字' },
        { control: 'color-picker', id: 'text-300', label: '常规文字' },
        { control: 'color-picker', id: 'text-400', label: '次要文字' },
        { control: 'color-picker', id: 'text-500', label: '占位文字' },

        { control: 'color-picker', id: 'border', label: '一级边框' },
        { control: 'color-picker', id: 'border-100', label: '二级边框' },
        { control: 'color-picker', id: 'border-200', label: '三级边框' },
        { control: 'color-picker', id: 'border-300', label: '四级边框' },

        { control: 'color-picker', id: 'black', label: '基础黑色' },
        { control: 'color-picker', id: 'white', label: '基础白色' }
      ]
    }
  ];
}
