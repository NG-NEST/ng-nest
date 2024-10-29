import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XHighlightComponent, XHighlightLines, XHighlightPrefix } from '@ng-nest/ui/highlight';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XHighlightComponent],
  template: ` <x-highlight></x-highlight> `
})
class XTestHighlightComponent {}

@Component({
  standalone: true,
  imports: [XHighlightComponent],
  template: `
    <x-highlight
      [type]="type()"
      [data]="data()"
      [highlightLines]="highlightLines()"
      [showCopy]="showCopy()"
    ></x-highlight>

    <input #input allow="clipboard-write" />
  `
})
class XTestHighlightPropertyComponent {
  type = signal('');
  data = signal('');
  highlightLines = signal<XHighlightLines>({});
  showCopy = signal(false);
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');
}

describe(XHighlightPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestHighlightComponent, XTestHighlightPropertyComponent],
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
    let fixture: ComponentFixture<XTestHighlightComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestHighlightComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XHighlightComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestHighlightPropertyComponent>;
    let component: XTestHighlightPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestHighlightPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      component.type.set('html');
      fixture.detectChanges();
      const code = fixture.debugElement.query(By.css('.x-highlight > pre > code'));
      expect(code.nativeElement).toHaveClass('language-html');
    });
    it('data.', () => {
      const html = '<span class="x-highlight"></span>';
      component.data.set(html);
      component.type.set('html');
      fixture.detectChanges();
      const code = fixture.debugElement.query(By.css('.x-highlight > pre > code'));
      expect(code.nativeElement).toHaveClass('language-html');
      expect(code.nativeElement.innerText).toBe(html);
    });
    it('highlightLines.', () => {
      const html = `<span class="x-highlight"></span>
<span class="x-highlight"></span>`;
      component.data.set(html);
      component.highlightLines.set({ danger: '1', primary: '2' });
      component.type.set('html');
      fixture.detectChanges();
      const lines = fixture.debugElement.queryAll(By.css('.line-highlight'));
      expect(lines.length).toBe(2);
      expect(lines[0].nativeElement).toHaveClass('danger');
      expect(lines[1].nativeElement).toHaveClass('primary');
    });
    it('showCopy.', async () => {
      // Need to allow the copy and paste function of code on the browser

      const html = '<span class="x-highlight"></span>';
      component.showCopy.set(true);
      component.data.set(html);
      component.type.set('html');
      fixture.detectChanges();
      const copy = fixture.debugElement.query(By.css('.x-highlight-copy'));
      expect(copy).toBeTruthy();

      // copy.nativeElement.click();
      // component.input().nativeElement.focus();
      // fixture.detectChanges();
      // const text = await navigator.clipboard.readText();
      // expect(text).toBe(html);
    });
  });
});
