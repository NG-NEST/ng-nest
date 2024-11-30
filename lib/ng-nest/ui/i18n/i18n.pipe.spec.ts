import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { XI18nPipe, XI18nDirective } from '@ng-nest/ui/i18n';
import { XI18nPrefix } from './i18n.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XI18nService } from './i18n.service';
import en_US from './languages/en_US';
import zh_CN from './languages/zh_CN';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

@Component({
  imports: [XI18nPipe, XI18nDirective, XButtonComponent],
  template: `
    <x-button>{{ 'comment.comments' | xI18n }}</x-button>
    <p x-i18n="comment.comments"></p>
  `
})
class TestXI18nComponent {
  constructor(
    private i18nService: XI18nService,
    private cdr: ChangeDetectorRef
  ) {}

  index = 1;

  english() {
    this.i18nService.setLocale(
      {
        ...en_US
      },
      true
    );
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}

describe(XI18nPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestXI18nComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXI18nComponent>;
    let component: TestXI18nComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXI18nComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create.', () => {
      const com = fixture.debugElement.query(By.directive(XI18nDirective));
      const btn = fixture.debugElement.query(By.directive(XButtonComponent));
      expect(com.nativeElement.innerText).toBe('评论');
      expect(btn.nativeElement.innerText).toBe('评论');
    });
    it('switch language.', () => {
      component.english();
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.directive(XI18nDirective));
      const btn = fixture.debugElement.query(By.directive(XButtonComponent));
      expect(com.nativeElement.innerText).toBe('Comments');
      expect(btn.nativeElement.innerText).toBe('Comments');

      component.chinese();
      fixture.detectChanges();
      expect(com.nativeElement.innerText).toBe('评论');
      expect(btn.nativeElement.innerText).toBe('评论');
    });
  });
});
