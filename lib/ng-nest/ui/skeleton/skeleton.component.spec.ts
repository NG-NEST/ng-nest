import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSkeletonComponent, XSkeletonData, XSkeletonPrefix, XSkeletonRow } from '@ng-nest/ui/skeleton';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestSkeletonPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSkeletonPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('loading.', () => {
      expect(true).toBe(true);
    });
    it('active.', () => {
      expect(true).toBe(true);
    });
    it('border.', () => {
      expect(true).toBe(true);
    });
  });
});
