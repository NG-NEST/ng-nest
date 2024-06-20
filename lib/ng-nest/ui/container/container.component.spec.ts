import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XContainerComponent } from './container.component';
import { XContainerModule } from './container.module';
import { XAsideComponent } from './aside.component';
import { XHeaderComponent } from './header.component';
import { XFooterComponent } from './footer.component';
import { XMainComponent } from './main.component';
import { XDirection } from '@ng-nest/ui/core';
import { XContainerPrefix } from './container.property';

@Component({
  standalone: true,
  imports: [XContainerModule],
  template: `
    <x-container>
      <x-aside>Aside</x-aside>
      <x-container>
        <x-header>Header</x-header>
        <x-main>Main</x-main>
        <x-footer>footer</x-footer>
      </x-container>
    </x-container>
  `
})
class XTestContainerComponent {}

@Component({
  standalone: true,
  imports: [XContainerModule],
  template: `
    <x-container [direction]="direction()">
      <x-aside [width]="asideWidth()">Aside</x-aside>
      <x-container>
        <x-header [height]="headerHeight()">Header</x-header>
        <x-main>Main</x-main>
        <x-footer [height]="footerHeight()">footer</x-footer>
      </x-container>
    </x-container>
  `
})
class XTestContainerPropertyComponent {
  direction = signal<XDirection | null>(null);
  headerHeight = signal('3rem');
  asideWidth = signal('12rem');
  footerHeight = signal('3rem');
}

describe(XContainerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestContainerComponent, XTestContainerPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestContainerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestContainerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const container = fixture.debugElement.query(By.directive(XContainerComponent));
      expect(container).toBeDefined();

      const aside = fixture.debugElement.query(By.directive(XAsideComponent));
      expect(aside).toBeDefined();

      const header = fixture.debugElement.query(By.directive(XHeaderComponent));
      expect(header).toBeDefined();

      const footer = fixture.debugElement.query(By.directive(XFooterComponent));
      expect(footer).toBeDefined();

      const main = fixture.debugElement.query(By.directive(XMainComponent));
      expect(main).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestContainerPropertyComponent>;
    let component: XTestContainerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestContainerPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('direction.', () => {
      component.direction.set('column');
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.directive(XContainerComponent));
      expect(container.nativeElement).toHaveClass('x-direction-column');
    });
    it('header height.', () => {
      const header = fixture.debugElement.query(By.directive(XHeaderComponent));
      expect(header.nativeElement.style.height).toBe('3rem');

      component.headerHeight.set('56px');
      fixture.detectChanges();
      expect(header.nativeElement.style.height).toBe('56px');
    });

    it('footer height.', () => {
      const footer = fixture.debugElement.query(By.directive(XFooterComponent));
      expect(footer.nativeElement.style.height).toBe('3rem');

      component.footerHeight.set('56px');
      fixture.detectChanges();
      expect(footer.nativeElement.style.height).toBe('56px');
    });

    it('footer width.', () => {
      const aside = fixture.debugElement.query(By.directive(XAsideComponent));
      expect(aside.nativeElement.style.width).toBe('12rem');

      component.asideWidth.set('200px');
      fixture.detectChanges();
      expect(aside.nativeElement.style.width).toBe('200px');
    });
  });
});
