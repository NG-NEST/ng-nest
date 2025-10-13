import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, TemplateRef, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCardComponent, XCardPrefix, XCardShadow } from '@ng-nest/ui/card';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'x-test-card',
  imports: [XCardComponent],
  template: `<x-card></x-card>`
})
class XTestCardComponent {}

@Component({
  selector: 'x-test-card-property',
  imports: [XCardComponent],
  template: `
    <x-card [width]="width()" [bodyStyle]="bodyStyle()" [header]="header()" [shadow]="shadow()"></x-card>
    <ng-template #headerTpl>header title</ng-template>
  `
})
class XTestCardPropertyComponent {
  width = signal('');
  bodyStyle = signal({});
  headerTpl = viewChild.required<TemplateRef<any>>('headerTpl');
  header = signal<TemplateRef<any> | null>(null);
  shadow = signal<XCardShadow>('always');
}

xdescribe(XCardPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCardComponent, XTestCardPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestCardComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCardComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCardComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      const card = fixture.debugElement.query(By.css('.x-card'));
      expect(card.nativeElement).toHaveClass('x-card-always');
    });
  });
  xdescribe(`input.`, () => {
    let fixture: ComponentFixture<XTestCardPropertyComponent>;
    let component: XTestCardPropertyComponent;
    let card: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCardPropertyComponent);
      component = fixture.componentInstance;
      card = fixture.debugElement.query(By.css('.x-card'));
      fixture.detectChanges();
    });
    it('width.', () => {
      component.width.set('15rem');
      fixture.detectChanges();

      expect(card.nativeElement.style.width).toBe('15rem');
    });
    it('body style.', () => {
      component.bodyStyle.set({ padding: '10px' });
      fixture.detectChanges();

      const body = fixture.debugElement.query(By.css('.x-card-body'));
      expect(body.nativeElement.style.padding).toBe('10px');
    });
    it('header.', () => {
      component.header.set(component.headerTpl());
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.x-card-header'));
      expect(header.nativeElement.textContent.trim()).toBe('header title');
    });
    it('shadow.', () => {
      expect(card.nativeElement).toHaveClass('x-card-always');
      component.shadow.set('hover');
      fixture.detectChanges();

      expect(card.nativeElement).toHaveClass('x-card-hover');
    });
  });
});
