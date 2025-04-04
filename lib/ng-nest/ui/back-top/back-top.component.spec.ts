import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XBackTopComponent, XBackTopPrefix } from '@ng-nest/ui/back-top';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XSleep } from '@ng-nest/ui/core';

@Component({
  imports: [XBackTopComponent],
  template: ` <x-back-top></x-back-top> `
})
class XTestBackTopComponent {}

@Component({
  imports: [XBackTopComponent],
  template: `
    <div class="x-test-back-top-scroll" #target id="target" style="height: 200px;width: 200px; overflow: auto;">
      <div style="height:2000px">
        <x-back-top
          [target]="target"
          [right]="right()"
          [bottom]="bottom()"
          [visibilityHeight]="visibilityHeight()"
          [template]="template()"
        >
        </x-back-top>
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

@Component({
  imports: [XBackTopComponent],
  template: `
    <div class="x-test-back-top-scroll target" style="height: 200px;width: 200px; overflow: auto;">
      <div style="height:2000px">
        <x-back-top [target]="'.target'"> </x-back-top>
      </div>
    </div>
  `
})
class XTestBackTopCoverComponent {}

@Component({
  imports: [XBackTopComponent],
  template: `
    <div style="height:2000px">
      <x-back-top> </x-back-top>
    </div>
  `
})
class XTestBackTopWindowComponent {}

xdescribe(XBackTopPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        XTestBackTopComponent,
        XTestBackTopPropertyComponent,
        XTestBackTopCoverComponent,
        XTestBackTopWindowComponent
      ],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestBackTopPropertyComponent>;
    let component: XTestBackTopPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBackTopPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('right.', async () => {
      component.right.set('4rem');
      fixture.detectChanges();
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 300;
      await XSleep(200);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.style.marginRight).toBe('4rem');

      fixture.destroy();
    });
    it('bottom.', async () => {
      component.bottom.set('4rem');
      fixture.detectChanges();
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 300;
      await XSleep(200);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.style.marginBottom).toBe('4rem');

      fixture.destroy();
    });
    it('visibilityHeight.', async () => {
      component.visibilityHeight.set(300);
      fixture.detectChanges();
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      let panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeNull();
      scroll.scrollTop = 300;
      fixture.detectChanges();
      await XSleep(100);
      panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeDefined();

      fixture.destroy();
    });
    it('template.', async () => {
      component.template.set(component.templateTpl());
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = component.visibilityHeight();
      fixture.detectChanges();
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel.innerText).toBe('back');

      fixture.destroy();
    });
    it('target.', async () => {
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeDefined();

      fixture.destroy();
    });
  });

  xdescribe(`cover.`, async () => {
    let fixture: ComponentFixture<XTestBackTopCoverComponent>;
    let component: XTestBackTopCoverComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBackTopCoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('target string.', async () => {
      component;
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      const panel = document.querySelector('.cdk-overlay-pane')! as HTMLDivElement;
      expect(panel).toBeDefined();
    });
    it('backtop click.', async () => {
      const scroll = document.querySelector('.x-test-back-top-scroll')! as HTMLDivElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      const backtop = document.querySelector('.x-back-top')! as HTMLDivElement;
      backtop.click();
      await XSleep(400);
      expect(scroll.scrollTop).toBe(0);
    });
  });

  xdescribe(`window.`, async () => {
    let fixture: ComponentFixture<XTestBackTopWindowComponent>;
    let component: XTestBackTopWindowComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBackTopWindowComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('backtop click.', async () => {
      component;
      const scroll = document.documentElement;
      scroll.scrollTop = 200;
      await XSleep(100);
      const backtop = document.querySelector('.x-back-top')! as HTMLDivElement;
      backtop.click();
      await XSleep(400);
      expect(scroll.scrollTop).toBe(0);
    });
  });
});
