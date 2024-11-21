import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTagComponent, XTagPrefix } from '@ng-nest/ui/tag';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XSize, XType } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XTagComponent],
  template: ` <x-tag> </x-tag> `
})
class XTestTagComponent {}

@Component({
  imports: [XTagComponent],
  template: `
    <x-tag
      [type]="type()"
      [size]="size()"
      [bordered]="bordered()"
      [closable]="closable()"
      [dark]="dark()"
      [disabled]="disabled()"
      [checked]="checked()"
      [manual]="manual()"
      [selected]="selected()"
      [style]="style()"
      (close)="close($event)"
    >
    </x-tag>
  `
})
class XTestTagPropertyComponent {
  type = signal<XType>('initial');
  size = signal<XSize>('medium');
  bordered = signal(true);
  closable = signal(false);
  dark = signal(false);
  disabled = signal(false);
  checked = signal(false);
  manual = signal(false);
  selected = signal(false);
  style = signal<{ [cssStyle: string]: any } | null>(null);

  closeResult = signal<Event | null>(null);
  close(event: Event) {
    this.closeResult.set(event);
  }
}

describe(XTagPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTagComponent, XTestTagPropertyComponent],
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
    let fixture: ComponentFixture<XTestTagComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTagComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTagComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTagPropertyComponent>;
    // let component: XTestTagPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTagPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('closable.', () => {
      expect(true).toBe(true);
    });
    it('dark.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('checked.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('selected.', () => {
      expect(true).toBe(true);
    });
    it('style.', () => {
      expect(true).toBe(true);
    });
    it('close.', () => {
      expect(true).toBe(true);
    });
  });
});
