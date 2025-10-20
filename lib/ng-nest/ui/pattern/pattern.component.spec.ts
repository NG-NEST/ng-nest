import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPatternComponent } from '@ng-nest/ui/pattern';
import { XPatternPrefix } from './pattern.property';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

xdescribe(XPatternPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestXPatternComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe(`default.`, () => {
    let fixture: ComponentFixture<TestXPatternComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPatternComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPatternComponent));
      expect(com).toBeDefined();
    });
  });
});

@Component({
  imports: [XPatternComponent],
  template: ` <x-pattern>x-pattern</x-pattern> `
})
class TestXPatternComponent {}
