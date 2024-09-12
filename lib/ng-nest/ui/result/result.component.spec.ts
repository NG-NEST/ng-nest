import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XResultComponent, XResultPrefix, XResultStatus } from '@ng-nest/ui/result';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XResultComponent],
  template: ` <x-result> </x-result> `
})
class XTestResultComponent {}

@Component({
  standalone: true,
  imports: [XResultComponent],
  template: ` <x-result [status]="status()" [title]="title()" [icon]="icon()" [subTitle]="subTitle()"> </x-result> `
})
class XTestResultPropertyComponent {
  status = signal<XResultStatus>('info');
  title = signal<XTemplate | null>(null);
  icon = signal<XTemplate | null>(null);
  subTitle = signal<XTemplate | null>(null);
}

describe(XResultPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestResultComponent, XTestResultPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestResultComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestResultComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XResultComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestResultPropertyComponent>;
    // let component: XTestResultPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestResultPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('status.', () => {
      expect(true).toBe(true);
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('icon.', () => {
      expect(true).toBe(true);
    });
    it('subTitle.', () => {
      expect(true).toBe(true);
    });
  });
});
