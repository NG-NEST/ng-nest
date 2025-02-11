import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XRowPrefix } from './layout.property';
import { XLayoutModule } from './layout.module';
import { XRowComponent } from './row.component';
import { XColComponent } from './col.component';
import { XAlign, XJustify } from '@ng-nest/ui/core';

@Component({
  imports: [XLayoutModule],
  template: `
    <x-row>
      <x-col><div>one</div></x-col>
      <x-col><div>two</div></x-col>
      <x-col><div>three</div></x-col>
    </x-row>
  `
})
class XTestLayoutComponent {}

@Component({
  imports: [XLayoutModule],
  template: `
    <x-row [space]="space()" [justify]="justify()" [align]="align()">
      <x-col
        [span]="span()"
        [offset]="offset()"
        [xs]="xs()"
        [sm]="sm()"
        [md]="md()"
        [lg]="lg()"
        [xl]="xl()"
        [inherit]="inherit()"
      >
        <div>one</div>
      </x-col>
      <x-col
        [span]="span()"
        [offset]="offset()"
        [xs]="xs()"
        [sm]="sm()"
        [md]="md()"
        [lg]="lg()"
        [xl]="xl()"
        [inherit]="inherit()"
      >
        <div>two</div>
      </x-col>
      <x-col
        [span]="span()"
        [offset]="offset()"
        [xs]="xs()"
        [sm]="sm()"
        [md]="md()"
        [lg]="lg()"
        [xl]="xl()"
        [inherit]="inherit()"
      >
        <div>three</div>
      </x-col>
    </x-row>
  `
})
class XTestLayoutPropertyComponent {
  space = signal('');
  justify = signal<XJustify | ''>('');
  align = signal<XAlign | ''>('');
  span = signal(24);
  offset = signal(0);
  xs = signal(0);
  sm = signal(0);
  md = signal(0);
  lg = signal(0);
  xl = signal(0);
  inherit = signal(false);
}

xdescribe(XRowPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestLayoutComponent, XTestLayoutPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestLayoutComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestLayoutComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const row = fixture.debugElement.query(By.directive(XRowComponent));
      expect(row).toBeDefined();

      const col = fixture.debugElement.query(By.directive(XColComponent));
      expect(col).toBeDefined();
    });
    it('property.', () => {
      const row = fixture.debugElement.query(By.directive(XRowComponent));
      expect(row.nativeElement).toHaveClass('x-row');
      expect(row.nativeElement.style.marginLeft).toBe('0px');
      expect(row.nativeElement.style.marginRight).toBe('0px');

      const col = fixture.debugElement.query(By.directive(XColComponent));
      expect(col.nativeElement).toHaveClass('x-col');
      expect(col.nativeElement).toHaveClass('x-col-24');
      expect(col.nativeElement.style.paddingLeft).toBe('0px');
      expect(col.nativeElement.style.paddingRight).toBe('0px');
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestLayoutPropertyComponent>;
    let component: XTestLayoutPropertyComponent;
    let row: DebugElement;
    let col: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestLayoutPropertyComponent);
      component = fixture.componentInstance;
      row = fixture.debugElement.query(By.directive(XRowComponent));
      col = fixture.debugElement.query(By.directive(XColComponent));
      fixture.detectChanges();
    });
    it('space.', () => {
      expect(row.nativeElement.style.marginLeft).toBe('0px');
      expect(row.nativeElement.style.marginRight).toBe('0px');

      component.space.set('16px');
      fixture.detectChanges();
      expect(row.nativeElement.style.marginLeft).toBe('-8px');
      expect(row.nativeElement.style.marginRight).toBe('-8px');
    });
    it('justify.', () => {
      component.justify.set('center');
      fixture.detectChanges();
      expect(row.nativeElement).toHaveClass('x-justify-center');
    });
    it('align.', () => {
      component.align.set('center');
      fixture.detectChanges();
      expect(row.nativeElement).toHaveClass('x-align-center');
    });
    it('span.', () => {
      expect(col.nativeElement).toHaveClass('x-col-24');
      component.span.set(12);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-12');
    });
    it('offset.', () => {
      component.offset.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-offset-2');
    });
    it('xs.', () => {
      component.xs.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-xs-2');
    });
    it('sm.', () => {
      component.sm.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-sm-2');
    });
    it('md.', () => {
      component.md.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-md-2');
    });
    it('lg.', () => {
      component.lg.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-lg-2');
    });
    it('xl.', () => {
      component.xl.set(2);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-xl-2');
    });
    it('inherit.', () => {
      component.inherit.set(true);
      fixture.detectChanges();
      expect(col.nativeElement).toHaveClass('x-col-inherit');
    });
  });
});
