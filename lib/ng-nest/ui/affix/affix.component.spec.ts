import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAffixComponent, XAffixPrefix } from '@ng-nest/ui/affix';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
    imports: [XAffixComponent],
    template: `
    <x-affix>
      <div>affix</div>
    </x-affix>
  `
})
class XTestAffixComponent {}

@Component({
    imports: [XAffixComponent],
    template: `
    <x-affix [top]="top()" [left]="left()">
      <div>float info</div>
    </x-affix>
  `
})
class XTestAffixPropertyComponent {
  top = signal('10px');
  left = signal('10px');
}

describe(XAffixPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAffixComponent, XTestAffixPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestAffixComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestAffixComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XAffixComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAffixPropertyComponent>;
    let component: XTestAffixPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAffixPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('top.', () => {
      const affix = fixture.debugElement.query(By.css('.x-affix'));
      expect(affix.nativeElement.style.top).toBe('10px');

      component.top.set('20px');
      fixture.detectChanges();

      expect(affix.nativeElement.style.top).toBe('20px');
    });
    it('left.', () => {
      const affix = fixture.debugElement.query(By.css('.x-affix'));
      expect(affix.nativeElement.style.left).toBe('10px');

      component.left.set('20px');
      fixture.detectChanges();

      expect(affix.nativeElement.style.left).toBe('20px');
    });
  });
});
