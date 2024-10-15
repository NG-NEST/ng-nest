import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDrawerComponent, XDrawerPrefix } from '@ng-nest/ui/drawer';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XPosition, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XDrawerComponent],
  template: ` <x-drawer></x-drawer> `
})
class XTestDrawerComponent {}

@Component({
  standalone: true,
  imports: [XDrawerComponent],
  template: `
    <x-drawer
      [title]="title()"
      [visible]="visible()"
      [placement]="placement()"
      [size]="size()"
      [backdropClose]="backdropClose()"
      [hasBackdrop]="hasBackdrop()"
      [className]="className()"
      (close)="close()"
    >
    </x-drawer>
  `
})
class XTestDrawerPropertyComponent {
  title = signal<XTemplate>('');
  visible = signal(false);
  placement = signal<XPosition>('right');
  size = signal('30%');
  backdropClose = signal(true);
  hasBackdrop = signal(true);
  className = signal('');

  closeResult = signal(false);
  close() {
    this.closeResult.set(true);
  }
}

describe(XDrawerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDrawerComponent, XTestDrawerPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestDrawerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDrawerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDrawerComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDrawerPropertyComponent>;
    let component: XTestDrawerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDrawerPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showDrawer = async () => {
      component.visible.set(true);
      fixture.detectChanges();
      await XSleep(300);
    };
    const closeDrawer = async () => {
      component.visible.set(false);
      fixture.detectChanges();
      await XSleep(300);
    };
    it('title.', async () => {
      component.title.set('title');
      await showDrawer();
      const title = fixture.debugElement.query(By.css('.x-drawer-title'));
      expect(title.nativeElement.innerText).toBe('title');
      await closeDrawer();
    });
    it('visible.', async () => {
      await showDrawer();
      let drawer = fixture.debugElement.query(By.css('.x-drawer'));
      expect(drawer).toBeTruthy();
      await closeDrawer();
      drawer = fixture.debugElement.query(By.css('.x-drawer'));
      expect(drawer).toBeFalsy();
    });
    it('placement.', async () => {
      component.placement.set('left');
      fixture.detectChanges();

      await showDrawer();
      const drawer = fixture.debugElement.query(By.css('.x-drawer'));
      expect(drawer.nativeElement).toHaveClass('x-drawer-left');
      await closeDrawer();
    });
    it('size.', async () => {
      component.size.set('200px');
      fixture.detectChanges();
      await showDrawer();

      const overlay = document.querySelector('.cdk-overlay-pane')!;
      expect(overlay.clientWidth).toBe(200);
      await closeDrawer();
    });
    it('backdropClose.', async () => {
      await showDrawer();
      const back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      back.click();
      fixture.detectChanges();
      const drawer = fixture.debugElement.query(By.css('.x-drawer'));
      expect(drawer).not.toBeTruthy();

      await closeDrawer();
    });
    it('hasBackdrop.', async () => {
      await showDrawer();
      let back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      expect(back).toBeTruthy();

      await closeDrawer();
      component.hasBackdrop.set(false);
      fixture.detectChanges();
      await showDrawer();
      back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      expect(back).not.toBeTruthy();
      await closeDrawer();
    });
    it('className.', async () => {
      component.className.set('class-test');
      await showDrawer();
      const overlay = document.querySelector<HTMLDivElement>('.cdk-overlay-pane')!;
      expect(overlay).toHaveClass('class-test');

      await closeDrawer();
    });
    it('close.', async () => {
      await showDrawer();
      await closeDrawer();
      expect(component.closeResult()).toBe(true);
    });
  });
});
