import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDescriptionComponent, XDescriptionModule, XDescriptionPrefix } from '@ng-nest/ui/description';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XDescriptionModule],
  template: `
    <x-description>
      <x-description-item>1</x-description-item>
      <x-description-item>2</x-description-item>
      <x-description-item>3</x-description-item>
    </x-description>
  `
})
class XTestDescriptionComponent {}

@Component({
  standalone: true,
  imports: [XDescriptionModule],
  template: `
    <x-description
      [title]="title()"
      [bordered]="bordered()"
      [gridTemplateColumns]="gridTemplateColumns()"
      [size]="size()"
    >
      <x-description-item
        [gridArea]="gridArea()"
        [label]="label()"
        [justify]="justify()"
        [align]="align()"
        [direction]="direction()"
        [width]="width()"
        [flex]="flex()"
        [heading]="heading()"
        >1</x-description-item
      >
      <x-description-item>2</x-description-item>
      <x-description-item>3</x-description-item>
    </x-description>
  `
})
class XTestDescriptionPropertyComponent {
  title = signal<XTemplate>('');
  bordered = signal(true);
  gridTemplateColumns = signal('');
  size = signal<XSize>('medium');

  gridArea = signal('');
  label = signal<XTemplate>('');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('row');
  width = signal('');
  flex = signal(0);
  heading = signal(false);
}

describe(XDescriptionPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDescriptionComponent, XTestDescriptionPropertyComponent],
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
    let fixture: ComponentFixture<XTestDescriptionComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDescriptionComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDescriptionComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDescriptionPropertyComponent>;
    let component: XTestDescriptionPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDescriptionPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      component.title.set('title');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.x-description-header'));
      expect(header.nativeElement.innerText).toBe('title');
    });
    it('bordered.', () => {
      component.bordered.set(true);
      fixture.detectChanges();

      const description = fixture.debugElement.query(By.css('.x-description'));
      expect(description.nativeElement).toHaveClass('x-description-bordered');
    });
    it('gridTemplateColumns.', () => {
      component.gridTemplateColumns.set('100px 100px 100px');
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.x-description-item'));
      for (let item of items) {
        expect(item.nativeElement.clientWidth).toBe(100);
      }
    });
    it('size.', () => {
      component.size.set('small');
      fixture.detectChanges();

      const description = fixture.debugElement.query(By.css('.x-description'));
      expect(description.nativeElement).toHaveClass('x-description-small');
    });
    it('gridArea.', () => {
      component.gridTemplateColumns.set('100px 100px 100px');
      component.gridArea.set('1/1/1/4');
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement.clientWidth).toBe(300);
    });
    it('label.', () => {
      component.label.set('label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.x-description-item .x-description-item-label'));
      expect(label.nativeElement.innerText).toBe('label');
    });
    it('justify.', () => {
      component.justify.set('end');
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.align.set('end');
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.direction.set('column');
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement).toHaveClass('x-direction-column');
    });
    it('width.', () => {
      component.width.set('100px');
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement.clientWidth).toBe(100);
    });
    it('flex.', () => {
      component.flex.set(1);
      fixture.detectChanges();

      const grid = fixture.debugElement.query(By.css('.x-description-grid'));
      expect(grid.nativeElement.style.gridTemplateColumns).toBe('1fr');
    });
    it('heading.', () => {
      component.heading.set(true);
      fixture.detectChanges();
      
      const item = fixture.debugElement.query(By.css('.x-description-item'));
      expect(item.nativeElement).toHaveClass('x-description-item-heading');
    });
  });
});
