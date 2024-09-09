import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDescriptionComponent, XDescriptionModule, XDescriptionPrefix } from '@ng-nest/ui/description';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestDescriptionPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDescriptionPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('gridTemplateColumns.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('gridArea.', () => {
      expect(true).toBe(true);
    });
    it('label.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('align.', () => {
      expect(true).toBe(true);
    });
    it('direction.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('flex.', () => {
      expect(true).toBe(true);
    });
    it('heading.', () => {
      expect(true).toBe(true);
    });
  });
});
