import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XBackTopComponent, XBackTopPrefix } from '@ng-nest/ui/back-top';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XSleep } from '@ng-nest/ui/core';

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
    <x-back-top [right]="right()" [bottom]="bottom()" [visibilityHeight]="visibilityHeight()" [template]="template()">
    </x-back-top>

    <div style="height:2000px"></div>
    <div class="x-test-back-top-scroll" #target style="height: 200px;width: 200px; overflow: auto;">
      <div style="height:2000px">
        <x-back-top [target]="target"> </x-back-top>
      </div>
    </div>
    <ng-template #templateTpl>back</ng-template>
  `
})
class XTestBackTopPropertyComponent {
  right = signal('2.5rem');
  bottom = signal('2.5rem');
  visibilityHeight = signal(200);
  template = signal<TemplateRef<any> | null>(null);
  templateTpl = viewChild.required<TemplateRef<any>>('templateTpl');
}

describe(XBackTopPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestBackTopComponent, XTestBackTopPropertyComponent],
      providers: [
        provideAnimations(),
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
    let component: XTestBackTopPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBackTopPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('right.', async () => {
      component.right.set('4rem');
      document.documentElement.scrollTop = 300;
      fixture.detectChanges();
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.style.marginRight).toBe('4rem');
    });
    it('bottom.', async () => {
      component.bottom.set('4rem');
      document.documentElement.scrollTop = 300;
      fixture.detectChanges();
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.style.marginBottom).toBe('4rem');
    });
    it('visibilityHeight.', async () => {
      component.visibilityHeight.set(300);
      document.documentElement.scrollTop = 200;
      fixture.detectChanges();
      await XSleep(100);
      let panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeNull();
      document.documentElement.scrollTop = 300;
      fixture.detectChanges();
      await XSleep(100);
      panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeDefined();
    });
    it('template.', async () => {
      component.template.set(component.templateTpl());
      document.documentElement.scrollTop = component.visibilityHeight();
      fixture.detectChanges();
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.innerText).toBe('back');
    });
    it('target.', async () => {
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeDefined();
    });
  });
});
