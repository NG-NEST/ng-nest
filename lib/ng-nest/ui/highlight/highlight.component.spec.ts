import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XHighlightComponent, XHighlightLines, XHighlightPrefix } from '@ng-nest/ui/highlight';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
  `
})
class XTestHighlightPropertyComponent {
  type = signal('');
  data = signal('');
  highlightLines = signal<XHighlightLines>({});
  showCopy = signal(false);
}

describe(XHighlightPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestHighlightComponent, XTestHighlightPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestHighlightPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestHighlightPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('highlightLines.', () => {
      expect(true).toBe(true);
    });
    it('showCopy.', () => {
      expect(true).toBe(true);
    });
  });
});
