import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSkeletonComponent, XSkeletonData, XSkeletonPrefix, XSkeletonRow } from '@ng-nest/ui/skeleton';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XSkeletonComponent],
  template: ` <x-skeleton> </x-skeleton> `
})
class XTestSkeletonComponent {}

@Component({
  standalone: true,
  imports: [XSkeletonComponent],
  template: ` <x-skeleton [data]="data()" [loading]="loading()" [active]="active()" [border]="border()"> </x-skeleton> `
})
class XTestSkeletonPropertyComponent {
  data = signal<XSkeletonRow[]>(XSkeletonData);
  loading = signal(true);
  active = signal(false);
  border = signal(false);
}

describe(XSkeletonPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSkeletonComponent, XTestSkeletonPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestSkeletonComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSkeletonComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSkeletonComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSkeletonPropertyComponent>;
    let component: XTestSkeletonPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSkeletonPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set([{ cols: [{ width: '10rem', type: 'title' }] }]);
      fixture.detectChanges();
      const rows = fixture.debugElement.queryAll(By.css('x-row'));
      const cols = fixture.debugElement.queryAll(By.css('x-col'));
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(1);
    });
    it('loading.', () => {
      component.loading.set(false);
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('.x-skeleton'));
      expect(skeleton).toBeFalsy();
    });
    it('active.', () => {
      component.active.set(true);
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('.x-skeleton'));
      expect(skeleton.nativeElement).toHaveClass('x-skeleton-active');
    });
    it('border.', () => {
      component.border.set(true);
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('.x-skeleton'));
      expect(skeleton.nativeElement).toHaveClass('x-skeleton-border');
    });
  });
});
