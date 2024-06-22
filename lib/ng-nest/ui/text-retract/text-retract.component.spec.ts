import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTextRetractComponent } from '@ng-nest/ui/text-retract';
import { FormsModule } from '@angular/forms';
import { XTextRetractPrefix } from './text-retract.property';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { XButtonComponent } from '@ng-nest/ui/button';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTextRetractPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXTextRetractComponent],
      imports: [FormsModule, XTextRetractComponent, XRowComponent, XColComponent, XButtonComponent, XIconComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTextRetractComponent>;
    let textRetract: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextRetractComponent);
      fixture.detectChanges();
      textRetract = fixture.debugElement.query(By.directive(XTextRetractComponent));
    });
    it('should create.', () => {
      expect(textRetract).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <div class="row">
      <x-text-retract [content]="content"></x-text-retract>
    </div>
  `
})
class TestXTextRetractComponent {
  content = `天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。`;

  constructor(
    private i18nService: XI18nService,
    private cdr: ChangeDetectorRef
  ) {}

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
