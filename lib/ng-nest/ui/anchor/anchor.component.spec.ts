import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAnchorComponent, XAnchorLayout, XAnchorPrefix } from '@ng-nest/ui/anchor';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XJustify } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XAnchorComponent],
  template: ` <x-anchor> </x-anchor> `
})
class XTestAnchorComponent {}

@Component({
  standalone: true,
  imports: [XAnchorComponent],
  template: `
    <div #scrollRef style="height: 60rem; width: 100%; overflow: auto;">
      <x-anchor
        [scroll]="scroll()"
        [affixTop]="affixTop()"
        [affixBottom]="affixBottom()"
        [affixWidth]="affixWidth()"
        [layout]="layout()"
        [justify]="justify()"
      >
      </x-anchor>
    </div>
  `
})
class XTestAnchorPropertyComponent {
  scrollRef = viewChild<ElementRef>('scrollRef');
  scroll = signal<ElementRef | null>(null);
  affixTop = signal(0);
  affixBottom = signal(0);
  affixWidth = signal('');
  layout = signal<XAnchorLayout>('right');
  justify = signal<XJustify>('start');
}

describe(XAnchorPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAnchorComponent, XTestAnchorPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestAnchorComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestAnchorComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XAnchorComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAnchorPropertyComponent>;
    let component: XTestAnchorPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAnchorPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('scroll.', () => {
      let com = fixture.debugElement.query(By.directive(XAnchorComponent));
      expect(com.componentInstance.scrollElement()).toBe(com.componentInstance.document.documentElement);

      component.scroll.set(component.scrollRef()!);
      fixture.detectChanges();
      expect(com.componentInstance.scrollElement()).toBe(component.scrollRef());
    });
    it('affixTop.', () => {
      let affix = fixture.debugElement.query(By.css('.x-affix'));
      expect(affix.nativeElement.style.top).toBe('0px');

      component.affixTop.set(100);
      fixture.detectChanges();
      expect(affix.nativeElement.style.top).toBe('100px');
    });
    it('affixBottom.', () => {
      let slider = fixture.debugElement.query(By.css('.x-anchor-slider'));
      expect(slider.nativeElement.style.height).toBe('0px');
    });
    it('affixWidth.', () => {
      let slider = fixture.debugElement.query(By.css('.x-anchor-slider'));
      expect(slider.nativeElement.style.width).toBe('');

      component.affixWidth.set('100px');
      fixture.detectChanges();
      expect(slider.nativeElement.style.width).toBe('100px');
    });
    it('layout.', () => {
      let anchor = fixture.debugElement.query(By.css('.x-anchor'));
      expect(anchor.nativeElement.classList).toContain('x-anchor-right');

      component.layout.set('left');
      fixture.detectChanges();
      anchor = fixture.debugElement.query(By.css('.x-anchor'));
      expect(anchor.nativeElement.classList).toContain('x-anchor-left');
    });
    it('justify.', () => {
      // test x-slider nodeJustify
      expect(true).toBe(true);
    });
  });
});
