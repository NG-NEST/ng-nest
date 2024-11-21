import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTimelineComponent, XTimelineMode, XTimelineNode, XTimelinePrefix } from '@ng-nest/ui/timeline';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XSize, XTemplate, XType } from '@ng-nest/ui/core';

@Component({
  imports: [XTimelineComponent],
  template: ` <x-timeline> </x-timeline> `
})
class XTestTimelineComponent {}

@Component({
  imports: [XTimelineComponent],
  template: `
    <x-timeline [data]="data()" [type]="type()" [size]="size()" [wrapper]="wrapper()" [mode]="mode()"> </x-timeline>
  `
})
class XTestTimelinePropertyComponent {
  data = signal<XDataArray<XTimelineNode>>([]);
  type = signal<XType | null>(null);
  size = signal<XSize>('medium');
  wrapper = signal<XTemplate | null>(null);
  mode = signal<XTimelineMode>('left');
}

describe(XTimelinePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTimelineComponent, XTestTimelinePropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTimelineComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTimelineComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTimelineComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTimelinePropertyComponent>;
    // let component: XTestTimelinePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTimelinePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('wrapper.', () => {
      expect(true).toBe(true);
    });
    it('mode.', () => {
      expect(true).toBe(true);
    });
  });
});
