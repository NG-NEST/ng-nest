import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  inject,
  provideExperimentalZonelessChangeDetection,
  signal,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAnchorComponent, XAnchorInnerComponent, XAnchorLayout, XAnchorPrefix } from '@ng-nest/ui/anchor';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XJustify, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'x-test-anchor',
  imports: [XAnchorComponent],
  template: ` <x-anchor> </x-anchor> `
})
class XTestAnchorComponent {}

@Component({
  selector: 'x-test-anchor-property',
  imports: [XAnchorComponent, XAnchorInnerComponent],
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
        <x-anchor-inner [innerHTML]="html()"></x-anchor-inner>
      </x-anchor>
    </div>
  `
})
class XTestAnchorPropertyComponent {
  scrollRef = viewChild.required<ElementRef>('scrollRef');
  scroll = signal<HTMLElement | null>(null);
  affixTop = signal(0);
  affixBottom = signal(0);
  affixWidth = signal('');
  layout = signal<XAnchorLayout>('right');
  justify = signal<XJustify>('start');
  html = signal(``);

  defaultScroll = inject(DOCUMENT).documentElement;
}

xdescribe(XAnchorPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAnchorComponent, XTestAnchorPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()]
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
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

      component.scroll.set(component.scrollRef().nativeElement);
      fixture.detectChanges();
      expect(com.componentInstance.scrollElement()).toBe(component.scrollRef().nativeElement);
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

  xdescribe(`coverage.`, async () => {
    let fixture: ComponentFixture<XTestAnchorPropertyComponent>;
    let component: XTestAnchorPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAnchorPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('htmlChange.', () => {
      component.html.update(
        () => `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>`
      );
      fixture.detectChanges();
      const inner = fixture.debugElement.query(By.css('x-anchor-inner'));
      expect(inner.nativeElement.innerText).not.toBeNull();
    });
    it('activatedChange.', async () => {
      component.html.update(
        () => `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>`
      );
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link.click();
      fixture.detectChanges();
      await XSleep(100);
      const { scrollTop } = document.documentElement;
      expect(scrollTop > 0).toBeTrue();
    });
    it('scrolling.', async () => {
      component.html.update(
        () => `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>`
      );
      fixture.detectChanges();
      const link2 = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link2.click();
      fixture.detectChanges();
      await XSleep(200);
      const linkActivated = fixture.debugElement.query(
        By.css('.x-slider-scroll ul li.x-slider-activated')
      ).nativeElement;
      expect(linkActivated.innerText).toBe('Branching');
    });
    it('htmlNotMatch.', async () => {
      component.html.update(
        () => `<p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>`
      );
      fixture.detectChanges();
      await XSleep(200);
      const linkActivated = fixture.debugElement.query(By.css('.x-slider-scroll ul li.x-slider-activated'));
      expect(linkActivated).toBeFalsy();
    });
    it('scrollChange.', async () => {
      component.html.update(
        () => `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>`
      );
      component.scroll.set(component.scrollRef().nativeElement);
      fixture.detectChanges();
      const link2 = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link2.click();
      fixture.detectChanges();
      await XSleep(200);
      let { scrollTop } = component.scrollRef().nativeElement;
      expect(scrollTop > 0).toBeTrue();
    });
    it('scrollTop', async () => {
      component.html.update(
        () => `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>`
      );
      fixture.detectChanges();
      component.defaultScroll.scrollTop = 200;
      await XSleep(200);
      expect(true).toBeTrue();
    });
  });
});
