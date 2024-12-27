import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTimelineComponent, XTimelineMode, XTimelineNode, XTimelinePrefix } from '@ng-nest/ui/timeline';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAddDays, XDataArray, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XTimelineComponent],
  template: ` <x-timeline> </x-timeline> `
})
class XTestTimelineComponent {}

@Component({
  imports: [XTimelineComponent],
  template: ` <x-timeline [data]="data()" [wrapper]="wrapper()" [mode]="mode()"> </x-timeline>
    <ng-template #wrapperTpl let-node="$node"> {{ node.label }} tpl </ng-template>`
})
class XTestTimelinePropertyComponent {
  data = signal<XDataArray<XTimelineNode>>([]);
  wrapper = signal<XTemplate | null>(null);
  wrapperTpl = viewChild.required<TemplateRef<void>>('wrapperTpl');
  mode = signal<XTimelineMode>('left');
}

describe(XTimelinePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTimelineComponent, XTestTimelinePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestTimelinePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTimelinePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set([
        {
          label: 'test1',
          content: 'content1',
          time: XAddDays(new Date(), -3)
        },
        {
          label: 'test2',
          content: 'content2',
          time: XAddDays(new Date(), -2)
        }
      ]);
      fixture.detectChanges();
      const links = fixture.debugElement.query(By.css('.x-timeline-label x-link'));
      expect(links.nativeElement.innerText).toBe('test1');
    });
    it('wrapper.', () => {
      component.data.set([
        {
          label: 'test1',
          content: 'content1',
          time: XAddDays(new Date(), -3)
        }
      ]);
      component.wrapper.set(component.wrapperTpl());
      fixture.detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.x-timeline-wrapper'));
      expect(wrapper.nativeElement.innerText.trim()).toBe('test1 tpl');
    });
    it('mode.', () => {
      component.mode.set('right');
      fixture.detectChanges();
      const timeline = fixture.debugElement.query(By.css('.x-timeline'));
      expect(timeline.nativeElement).toHaveClass('x-timeline-right');
    });
  });
});
