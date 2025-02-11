import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XColorComponent, XColorPrefix } from '@ng-nest/ui/color';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  imports: [XColorComponent],
  template: `<x-color></x-color>`
})
class XTestColorComponent {}

@Component({
  imports: [XColorComponent],
  template: `<x-color [label]="label()" [hex]="hex()" [amounts]="amounts()"> </x-color>`
})
class XTestColorPropertyComponent {
  label = signal('label');
  hex = signal('#000000');
  amounts = signal([0.8, 0.9]);
}

xdescribe(XColorPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestColorComponent, XTestColorPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestColorComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestColorComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XColorComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      const color = fixture.debugElement.query(By.css('x-color')).nativeElement;
      expect(color).toHaveClass(`${XColorPrefix}`);

      const primary = fixture.debugElement.query(By.css('.x-color-primary')).nativeElement;
      expect(primary.firstChild.textContent).toBe('color');

      const gradual = fixture.debugElement.queryAll(By.css('.x-color-item'));
      expect(gradual.length).toBe(10);
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestColorPropertyComponent>;
    let component: XTestColorPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestColorPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('label.', () => {
      const primary = fixture.debugElement.query(By.css('.x-color-primary')).nativeElement;
      expect(primary.firstChild.textContent).toBe('label');

      component.label.set('my-color');
      fixture.detectChanges();
      expect(primary.firstChild.textContent).toBe('my-color');
    });
    it('hex.', () => {
      const hex = fixture.debugElement.query(By.css('.x-color-hex')).nativeElement;
      expect(hex.textContent).toBe('#000000');

      component.hex.set('#eeeeee');
      fixture.detectChanges();
      expect(hex.textContent).toBe('#eeeeee');
    });
    it('amounts.', () => {
      const gradual = fixture.debugElement.queryAll(By.css('.x-color-item'));
      expect(gradual.length).toBe(2);

      component.amounts.set([0.7, 0.8, 0.9]);
      fixture.detectChanges();
      const gradualChange = fixture.debugElement.queryAll(By.css('.x-color-item'));
      expect(gradualChange.length).toBe(3);
    });
  });
});
