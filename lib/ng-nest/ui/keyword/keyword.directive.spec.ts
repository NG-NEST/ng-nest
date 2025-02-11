import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  DebugElement,
  ElementRef,
  provideExperimentalZonelessChangeDetection,
  signal,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XKeywordPrefix, XKeywordType } from '@ng-nest/ui/keyword';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XComputedStyle } from '@ng-nest/ui/core';

@Component({
  selector: 'test-x-keyword',
  imports: [XKeywordDirective],
  template: `
    <span #contentRef x-keyword [type]="type()" [caseSensitive]="caseSensitive()" [color]="color()" [text]="text()"
      >Key key more More
    </span>
  `
})
class TestXKeywordComponent {
  contentRef = viewChild.required<ElementRef<HTMLSpanElement>>('contentRef');
  type = signal<XKeywordType>('primary');
  caseSensitive = signal(true);
  color = signal('');
  text = signal<string | string[]>('');
}

xdescribe(XKeywordPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestXKeywordComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe(`default.`, () => {
    let fixture: ComponentFixture<TestXKeywordComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXKeywordComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XKeywordDirective));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<TestXKeywordComponent>;
    let component: TestXKeywordComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(TestXKeywordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(component.contentRef().nativeElement).toHaveClass('x-keyword-primary');

      component.type.set('success');
      fixture.detectChanges();
      expect(component.contentRef().nativeElement).toHaveClass('x-keyword-success');
    });
    it('caseSensitive.', async () => {
      component.text.set('key');
      fixture.detectChanges();
      let keywords = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywords.length).toBe(1);

      component.caseSensitive.set(false);
      fixture.detectChanges();
      keywords = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywords.length).toBe(2);
    });
    it('color.', () => {
      component.text.set('key');
      component.color.set('rgb(0, 255, 0)');
      fixture.detectChanges();
      const keyword = fixture.debugElement.query(By.css('.x-keyword-text'));
      const color = XComputedStyle(keyword.nativeElement, 'color');
      expect(color).toBe('rgb(0, 255, 0)');
    });
    it('text.', () => {
      component.text.set('key');
      fixture.detectChanges();
      let keywords = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywords.length).toBe(1);
    });
  });
});
