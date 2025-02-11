import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTagComponent, XTagPrefix } from '@ng-nest/ui/tag';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XSize, XType } from '@ng-nest/ui/core';
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

xdescribe(XTagPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTagComponent, XTestTagPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTagPropertyComponent>;
    let component: XTestTagPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTagPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      component.type.set('success');
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-tag-success');
    });
    it('size.', () => {
      component.size.set('large');
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-tag-large');
    });
    it('bordered.', () => {
      component.bordered.set(false);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).not.toHaveClass('x-tag-bordered');
    });
    it('closable.', () => {
      component.closable.set(true);
      fixture.detectChanges();
      const close = fixture.debugElement.query(By.css('.x-tag .fto-x'));
      expect(close).toBeTruthy();
    });
    it('dark.', () => {
      component.dark.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-tag-dark');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-disabled');
    });
    it('checked.', () => {
      component.checked.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      tag.nativeElement.click();
      fixture.detectChanges();
      expect(tag.nativeElement).toHaveClass('x-tag-selected');
    });
    it('manual.', () => {
      component.manual.set(true);
      component.checked.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      tag.nativeElement.click();
      fixture.detectChanges();
      expect(tag.nativeElement).not.toHaveClass('x-tag-selected');

      component.selected.set(true);
      fixture.detectChanges();
      expect(tag.nativeElement).toHaveClass('x-tag-selected');
    });
    it('selected.', () => {
      component.selected.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-tag-selected');
    });
    it('style.', () => {
      component.style.set({ color: 'rgb(0, 0, 0)' });
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(XComputedStyle(tag.nativeElement, 'color')).toBe('rgb(0, 0, 0)');
    });
    it('close.', () => {
      component.closable.set(true);
      fixture.detectChanges();
      const close = fixture.debugElement.query(By.css('.x-tag x-icon'));
      close.nativeElement.click();
      fixture.detectChanges();
      expect(component.closeResult()).not.toBeNull();
    });
  });
});
