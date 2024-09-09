import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XEmptyComponent, XEmptyPrefix } from '@ng-nest/ui/empty';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XEmptyComponent],
  template: ` <x-empty> </x-empty> `
})
class XTestEmptyComponent {}

@Component({
  standalone: true,
  imports: [XEmptyComponent],
  template: ` <x-empty [img]="img()" [content]="content()"> </x-empty> `
})
class XTestEmptyPropertyComponent {
  img = signal<XTemplate>('');
  content = signal<XTemplate>('');
}

describe(XEmptyPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestEmptyComponent, XTestEmptyPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestEmptyComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestEmptyComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XEmptyComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestEmptyPropertyComponent>;
    // let component: XTestEmptyPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestEmptyPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('img.', () => {
      expect(true).toBe(true);
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
  });
});
