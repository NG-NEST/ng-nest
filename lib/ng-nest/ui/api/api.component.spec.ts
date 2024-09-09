import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XApiComponent, XApiPrefix } from '@ng-nest/ui/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XApiComponent],
  template: ` <x-api></x-api> `
})
class XTestApiComponent {}

describe(XApiPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestApiComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestApiComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestApiComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XApiComponent));
      expect(com).toBeDefined();
    });
  });
});
