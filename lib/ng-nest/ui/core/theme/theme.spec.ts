import { TestBed, ComponentFixture } from '@angular/core/testing';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XThemeService } from './theme.service';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XConfig, X_CONFIG } from '../config';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  template: `<div class="row">
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
    <x-color-picker [(ngModel)]="color" (ngModelChange)="colorChange($event)"></x-color-picker> `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class XGlobalThemeTestBasicComponent {
  color!: string;
  constructor(public themeService: XThemeService) {}
  colorChange(color: string) {
    this.themeService.setTheme({ colors: { primary: color } });
  }
}

describe('x-theme', () => {
  let fixture: ComponentFixture<XGlobalThemeTestBasicComponent>;
  let config: XConfig = {
    theme: {
      colors: {
        primary: '#6435c9'
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XGlobalThemeTestBasicComponent],
      imports: [XButtonComponent, BrowserAnimationsModule, XColorPickerComponent, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: X_CONFIG,
          useValue: config
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XGlobalThemeTestBasicComponent);
  });
  it('should theme work', () => {
    fixture.detectChanges();
    expect(true).toBe(true);
  });
});
