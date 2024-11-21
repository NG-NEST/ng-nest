import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTextRetractComponent, XTextRetractPrefix } from '@ng-nest/ui/text-retract';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  imports: [XTextRetractComponent],
  template: ` <x-text-retract> </x-text-retract> `
})
class XTestTextRetractComponent {}

@Component({
  imports: [XTextRetractComponent],
  template: ` <x-text-retract [content]="content()" [max]="max()"> </x-text-retract> `
})
class XTestTextRetractPropertyComponent {
  content = signal('');
  max = signal(256);
}

describe(XTextRetractPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTextRetractComponent, XTestTextRetractPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTextRetractComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTextRetractComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTextRetractComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTextRetractPropertyComponent>;
    // let component: XTestTextRetractPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTextRetractPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
    it('max.', () => {
      expect(true).toBe(true);
    });
  });
});
