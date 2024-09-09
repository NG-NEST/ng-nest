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
      <x-anchor [scroll]="scroll()" [affixTop]="affixTop()" [affixBottom]="affixBottom()" [affixWidth]="affixWidth()">
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
      expect(true).toBe(true);
    });
    it('affixBottom.', () => {
      expect(true).toBe(true);
    });
    it('affixWidth.', () => {
      expect(true).toBe(true);
    });
    it('layout.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
  });
});
