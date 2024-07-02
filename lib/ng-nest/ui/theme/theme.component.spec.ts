import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XThemePrefix } from './theme.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XFormComponent } from '@ng-nest/ui/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XThemeComponent } from './theme.component';

describe(XThemePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXThemeComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        XButtonComponent,
        XButtonsComponent,
        XThemeComponent,
        XSwitchComponent,
        XFormComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
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
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <x-theme [(ngModel)]="model" showDark showDetail></x-theme>
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

    <div class="row">
      <x-button disabled>默认按钮</x-button>
      <x-button type="primary" disabled>主要按钮</x-button>
      <x-button type="success" disabled>成功按钮</x-button>
      <x-button type="warning" disabled>警告按钮</x-button>
      <x-button type="danger" disabled>危险按钮</x-button>
      <x-button type="info" disabled>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button plain disabled>朴素按钮</x-button>
      <x-button type="primary" plain disabled>主要按钮</x-button>
      <x-button type="success" plain disabled>成功按钮</x-button>
      <x-button type="warning" plain disabled>警告按钮</x-button>
      <x-button type="danger" plain disabled>危险按钮</x-button>
      <x-button type="info" plain disabled>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button round disabled>圆角按钮</x-button>
      <x-button type="primary" round disabled>主要按钮</x-button>
      <x-button type="success" round disabled>成功按钮</x-button>
      <x-button type="warning" round disabled>警告按钮</x-button>
      <x-button type="danger" round disabled>危险按钮</x-button>
      <x-button type="info" round disabled>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle disabled></x-button>
      <x-button icon="fto-edit-3" type="primary" circle disabled></x-button>
      <x-button icon="fto-check" type="success" circle disabled></x-button>
      <x-button icon="fto-star" type="warning" circle disabled></x-button>
      <x-button icon="fto-trash-2" type="danger" circle disabled></x-button>
      <x-button icon="fto-trash" type="info" circle disabled></x-button>
    </div>

    <div class="row">
      <x-button type="text">文字按钮</x-button>
      <x-button type="text" disabled>文字按钮</x-button>
    </div>

    <div class="row">
      <x-button icon="fto-edit-3" onlyIcon></x-button>
      <x-button icon="fto-edit-3" type="primary"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-trash-2" type="primary"></x-button>
      <x-button icon="fto-search" type="primary">搜索</x-button>
      <x-button icon="fto-upload-cloud" direction="row-reverse" type="primary">上传</x-button>
    </div>

    <div class="row">
      <x-buttons>
        <x-button>A</x-button>
        <x-button>B</x-button>
        <x-button>C</x-button>
        <x-button>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left">上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse">下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3"></x-button>
        <x-button icon="fto-share"></x-button>
        <x-button icon="fto-trash-2"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary">A</x-button>
        <x-button type="primary">B</x-button>
        <x-button type="primary">C</x-button>
        <x-button type="primary">D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" type="primary">上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" type="primary">下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary"></x-button>
        <x-button icon="fto-share" type="primary"></x-button>
        <x-button icon="fto-trash-2" type="primary"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button plain>A</x-button>
        <x-button plain>B</x-button>
        <x-button plain>C</x-button>
        <x-button plain>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" plain>上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" plain>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" plain></x-button>
        <x-button icon="fto-share" plain></x-button>
        <x-button icon="fto-trash-2" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary" plain>A</x-button>
        <x-button type="primary" plain>B</x-button>
        <x-button type="primary" plain>C</x-button>
        <x-button type="primary" plain>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button type="primary" icon="fto-chevron-left" plain>上一页</x-button>
        <x-button type="primary" icon="fto-chevron-right" direction="row-reverse" plain>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary" plain></x-button>
        <x-button icon="fto-share" type="primary" plain></x-button>
        <x-button icon="fto-trash-2" type="primary" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button round>A</x-button>
        <x-button round>B</x-button>
        <x-button round>C</x-button>
        <x-button round>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" round>上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" round>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" round></x-button>
        <x-button icon="fto-share" round></x-button>
        <x-button icon="fto-trash-2" round></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary" round>A</x-button>
        <x-button type="primary" round>B</x-button>
        <x-button type="primary" round>C</x-button>
        <x-button type="primary" round>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button type="primary" icon="fto-chevron-left" round>上一页</x-button>
        <x-button type="primary" icon="fto-chevron-right" direction="row-reverse" round>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary" round></x-button>
        <x-button icon="fto-share" type="primary" round></x-button>
        <x-button icon="fto-trash-2" type="primary" round></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons space="1">
        <x-button>上一页</x-button>
        <x-button>1</x-button>
        <x-button>2</x-button>
        <x-button>3</x-button>
        <x-button>4</x-button>
        <x-button>下一页</x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons space="0.1" hiddenBorder>
        <x-button icon="fto-edit-3" onlyIcon></x-button>
        <x-button icon="fto-share" onlyIcon></x-button>
        <x-button icon="fto-trash-2" onlyIcon></x-button>
        <x-button icon="fto-search" onlyIcon></x-button>
        <x-button icon="fto-upload-cloud" onlyIcon></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-button icon="fto-save" type="primary" [loading]="loading()" (click)="save()">保存</x-button>
    </div>
    <div class="row">
      <x-button size="big">超大按钮</x-button>
      <x-button size="large">大型按钮</x-button>
      <x-button>默认按钮</x-button>
      <x-button size="small">小型按钮</x-button>
      <x-button size="mini">迷你按钮</x-button>
    </div>
    <div class="row">
      <x-button type="primary" size="big">超大按钮</x-button>
      <x-button type="primary" size="large">大型按钮</x-button>
      <x-button type="primary">默认按钮</x-button>
      <x-button type="primary" size="small">小型按钮</x-button>
      <x-button type="primary" size="mini">迷你按钮</x-button>
    </div>
    <div class="row">
      <x-button type="primary" size="big" round>超大按钮</x-button>
      <x-button type="primary" size="large" round>大型按钮</x-button>
      <x-button type="primary" round>默认按钮</x-button>
      <x-button type="primary" size="small" round>小型按钮</x-button>
      <x-button type="primary" size="mini" round>迷你按钮</x-button>
    </div>
    <div class="row">
      <x-button icon="fto-share" type="primary" size="big"></x-button>
      <x-button icon="fto-share" type="primary" size="large"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-share" type="primary" size="small"></x-button>
      <x-button icon="fto-share" type="primary" size="mini"></x-button>
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
        margin: 1rem 0;
      }
      .row > x-button:not(:first-child),
      .row > x-buttons:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXThemeComponent {
  model = signal('');
  dark = signal(true);
  loading = signal(false);
  save() {
    if (this.loading()) return;
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }

  constructor(private i18nService: XI18nService) {}

  english() {
    this.i18nService.setLocale(en_US);
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
  }
}
