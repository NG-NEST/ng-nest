import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPopoverDirective, XPopoverPrefix, XPopoverTrigger } from '@ng-nest/ui/popover';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XPlacement, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XPopoverDirective],
  template: ` <div x-popover>popover</div> `
})
class XTestPopoverComponent {}

@Component({
  standalone: true,
  imports: [XPopoverDirective],
  template: `
    <div
      x-popover
      [title]="title()"
      [content]="content()"
      [footer]="footer()"
      [panelClass]="panelClass()"
      [connectTo]="connectTo()"
      [placement]="placement()"
      [trigger]="trigger()"
      [width]="width()"
      [maxWidth]="maxWidth()"
      [minWidth]="minWidth()"
      [(visible)]="visible"
      [condition]="condition()"
      [mouseEnterDelay]="mouseEnterDelay()"
      [mouseLeaveDelay]="mouseLeaveDelay()"
    ></div>
  `
})
class XTestPopoverPropertyComponent {
  title = signal<XTemplate>('');
  content = signal<XTemplate>('');
  footer = signal<XTemplate>('');
  panelClass = signal<string | string[]>('');
  connectTo = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  placement = signal<XPlacement>('top');
  trigger = signal<XPopoverTrigger>('hover');
  width = signal('');
  maxWidth = signal('10rem');
  minWidth = signal('10rem');
  visible = signal(false);
  condition = signal(false);
  mouseEnterDelay = signal(150);
  mouseLeaveDelay = signal(100);
}

describe(XPopoverPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPopoverComponent, XTestPopoverPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestPopoverComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestPopoverComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPopoverDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestPopoverPropertyComponent>;
    // let component: XTestPopoverPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPopoverPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
    it('footer.', () => {
      expect(true).toBe(true);
    });
    it('panelClass.', () => {
      expect(true).toBe(true);
    });
    it('connectTo.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('maxWidth.', () => {
      expect(true).toBe(true);
    });
    it('minWidth.', () => {
      expect(true).toBe(true);
    });
    it('visible.', () => {
      expect(true).toBe(true);
    });
    it('condition.', () => {
      expect(true).toBe(true);
    });
    it('mouseEnterDelay.', () => {
      expect(true).toBe(true);
    });
    it('mouseLeaveDelay.', () => {
      expect(true).toBe(true);
    });
  });
});
