import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XThemeComponent } from './theme.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XThemePrefix } from './theme.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XFormModule, XControl } from '@ng-nest/ui/form';
import { XConfigService, XTheme, XColorsTheme } from '@ng-nest/ui/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { XButtonModule } from '@ng-nest/ui/button';
import { XSwitchModule } from '@ng-nest/ui/switch';

describe(XThemePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, XButtonModule, XThemeModule, XSwitchModule, XFormModule],
      declarations: [TestXThemeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXThemeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXThemeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XThemeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-theme',
  template: `
    <x-form
      [formGroup]="formGroup"
      [controls]="controls"
      direction="row"
      labelSuffix=":"
      width="24rem"
      labelWidth="5rem"
      labelAlign="end"
      span="12"
    ></x-form>
    <div class="row">
      <x-switch label="暗黑模式" [(ngModel)]="dark" (ngModelChange)="darkChange($event)"></x-switch>
    </div>
    <div class="row">
      <x-button>默认按钮</x-button>
      <x-button type="primary">主要按钮</x-button>
      <x-button type="success">成功按钮</x-button>
      <x-button type="warning">警告按钮</x-button>
      <x-button type="danger">危险按钮</x-button>
      <x-button type="info">信息按钮</x-button>
    </div>
    <div class="row">
      <x-button plain>朴素按钮</x-button>
      <x-button type="primary" plain>主要按钮</x-button>
      <x-button type="success" plain>成功按钮</x-button>
      <x-button type="warning" plain>警告按钮</x-button>
      <x-button type="danger" plain>危险按钮</x-button>
      <x-button type="info" plain>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button round>圆角按钮</x-button>
      <x-button type="primary" round>主要按钮</x-button>
      <x-button type="success" round>成功按钮</x-button>
      <x-button type="warning" round>警告按钮</x-button>
      <x-button type="danger" round>危险按钮</x-button>
      <x-button type="info" round>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle></x-button>
      <x-button icon="fto-edit-3" type="primary" circle></x-button>
      <x-button icon="fto-check" type="success" circle></x-button>
      <x-button icon="fto-star" type="warning" circle></x-button>
      <x-button icon="fto-trash-2" type="danger" circle></x-button>
      <x-button icon="fto-trash" type="info" circle></x-button>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 1px solid var(--x-border);
      }
      .row {
        margin: 1rem 0;
      }
      .row > x-button:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXThemeComponent {
  formGroup = new FormGroup({});
  theme: XTheme = {
    colors: {}
  };
  currentColor: XColorsTheme | undefined;
  dark = false;
  controls: XControl[] = [
    { control: 'color-picker', id: 'primary', label: '主色' },
    { control: 'color-picker', id: 'background', label: '背景色' },
    { control: 'color-picker', id: 'success', label: '成功' },
    { control: 'color-picker', id: 'warning', label: '警告' },
    { control: 'color-picker', id: 'danger', label: '危险' },
    { control: 'color-picker', id: 'info', label: '信息' },
    { control: 'color-picker', id: 'text', label: '文字' },
    { control: 'color-picker', id: 'border', label: '边框' }
  ];
  constructor(private configService: XConfigService) {
    this.theme = this.configService.getTheme();
    this.currentColor = this.theme.colors;
    this.controls.map((x: XControl) => {
      x.value = (this.theme.colors as XColorsTheme)[x.id];
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.formGroup.valueChanges.pipe(debounceTime(100)).subscribe((x) => {
      this.currentColor = x;
      this.configService.setTheme({ colors: x });
    });
  }

  darkChange($event: Event) {
    console.log(111);
    if (this.dark) {
      this.configService.setTheme({
        colors: {
          text: '#d1d1d1',
          border: '#474747',
          background: '#000000'
        }
      });
    } else {
      this.configService.setTheme({ colors: this.currentColor });
    }
  }
}
