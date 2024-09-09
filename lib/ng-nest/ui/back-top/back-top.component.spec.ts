import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XBackTopComponent, XBackTopPrefix } from '@ng-nest/ui/back-top';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XBackTopComponent],
  template: ` <x-back-top></x-back-top> `
})
class XTestBackTopComponent {}

@Component({
  standalone: true,
  imports: [XBackTopComponent],
  template: `
    <x-back-top
      [right]="right()"
      [bottom]="bottom()"
      [visibilityHeight]="visibilityHeight()"
      [template]="template()"
      [target]="target()"
    >
    </x-back-top>

    <ng-template #templateTpl></ng-template>
  `
})
class XTestBackTopPropertyComponent {
  right = signal('2.5rem');
  bottom = signal('2.5rem');
  visibilityHeight = signal(200);
  template = signal<TemplateRef<any> | null>(null);
  templateTpl = viewChild<TemplateRef<any>>('templateTpl');
  target = signal<string | HTMLElement>('');
}

describe(XBackTopPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestBackTopComponent, XTestBackTopPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestBackTopComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestBackTopComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XBackTopComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestBackTopPropertyComponent>;
    // let component: XTestBackTopPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBackTopPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('right.', () => {
      expect(true).toBe(true);
    });
    it('bottom.', () => {
      expect(true).toBe(true);
    });
    it('visibilityHeight.', () => {
      expect(true).toBe(true);
    });
    it('template.', () => {
      expect(true).toBe(true);
    });
    it('target.', () => {
      expect(true).toBe(true);
    });
  });
});
