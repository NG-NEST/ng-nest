import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTooltipDirective, XTooltipPrefix } from '@ng-nest/ui/tooltip';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XPlacement, XTemplate } from '@ng-nest/ui/core';

@Component({
  imports: [XTooltipDirective],
  template: ` <x-tooltip> </x-tooltip> `
})
class XTestTooltipComponent {}

@Component({
  imports: [XTooltipDirective],
  template: `
    <x-tooltip
      [content]="content()"
      [placement]="placement()"
      [(visible)]="visible"
      [panelClass]="panelClass()"
      [connectTo]="connectTo()"
      [backgroundColor]="backgroundColor()"
      [color]="color()"
      [manual]="manual()"
      [mouseEnterDelay]="mouseEnterDelay()"
      [mouseLeaveDelay]="mouseLeaveDelay()"
      [disabled]="disabled()"
    >
    </x-tooltip>
  `
})
class XTestTooltipPropertyComponent {
  content = signal<XTemplate | null>(null);
  placement = signal<XPlacement>('top');
  visible = signal(false);
  panelClass = signal<string | string[]>('');
  connectTo = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  backgroundColor = signal('');
  color = signal('');
  manual = signal(false);
  mouseEnterDelay = signal(150);
  mouseLeaveDelay = signal(100);
  disabled = signal(false);
}

describe(XTooltipPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTooltipComponent, XTestTooltipPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTooltipComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTooltipComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTooltipDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTooltipPropertyComponent>;
    // let component: XTestTooltipPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTooltipPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('visible.', () => {
      expect(true).toBe(true);
    });
    it('panelClass.', () => {
      expect(true).toBe(true);
    });
    it('connectTo.', () => {
      expect(true).toBe(true);
    });
    it('backgroundColor.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('mouseEnterDelay.', () => {
      expect(true).toBe(true);
    });
    it('mouseLeaveDelay.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
  });
});
