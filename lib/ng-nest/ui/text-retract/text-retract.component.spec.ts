import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTextRetractComponent, XTextRetractPrefix } from '@ng-nest/ui/text-retract';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestTextRetractPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTextRetractPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('content.', () => {
      const content = Array.from({ length: 30 })
        .map((_, _i) => 'hello world!')
        .join('');
      component.content.set(content);
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-text-retract'));
      expect(text.nativeElement.innerText).not.toBe(content);
    });
    it('max.', () => {
      const content = Array.from({ length: 5 })
        .map((_, _i) => 'hello world!')
        .join('');
      component.content.set(content);
      component.max.set(100);
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-text-retract'));
      expect(text.nativeElement.innerText).toBe(content);

      component.max.set(50);
      fixture.detectChanges();
      expect(text.nativeElement.innerText).not.toBe(content);
    });
  });
});
