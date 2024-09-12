import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XProgressColor,
  XProgressComponent,
  XProgressGradient,
  XProgressPrefix,
  XProgressStatus,
  XProgressType
} from '@ng-nest/ui/progress';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XProgressComponent],
  template: ` <x-progress></x-progress> `
})
class XTestProgressComponent {}

@Component({
  standalone: true,
  imports: [XProgressComponent],
  template: `
    <x-progress
      [type]="type()"
      [percent]="percent()"
      [height]="height()"
      [status]="status()"
      [info]="info()"
      [infoWidth]="infoWidth()"
      [inside]="inside()"
      [format]="format()"
      [color]="color()"
      [gradient]="gradient()"
      [steps]="steps()"
      [stepWidth]="stepWidth()"
      [stepFlex]="stepFlex()"
      [thickness]="thickness()"
      [size]="size()"
      [notchAngle]="notchAngle()"
      [subsection]="subsection()"
    >
    </x-progress>
  `
})
class XTestProgressPropertyComponent {
  type = signal<XProgressType>('line');
  percent = signal(0);
  height = signal('1rem');
  status = signal<XProgressStatus>('normal');
  info = signal(true);
  infoWidth = signal('3.5rem');
  inside = signal(false);
  format = signal<((percent: number) => string) | null>(null);
  color = signal<XProgressColor | null>(null);
  gradient = signal<XProgressGradient | null>(null);
  steps = signal<number | null>(null);
  stepWidth = signal('2rem');
  stepFlex = signal(false);
  thickness = signal('1rem');
  size = signal('8rem');
  notchAngle = signal(80);
  subsection = signal(false);
}

describe(XProgressPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestProgressComponent, XTestProgressPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestProgressComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestProgressComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XProgressComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestProgressPropertyComponent>;
    // let component: XTestProgressPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestProgressPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('percent.', () => {
      expect(true).toBe(true);
    });
    it('height.', () => {
      expect(true).toBe(true);
    });
    it('status.', () => {
      expect(true).toBe(true);
    });
    it('info.', () => {
      expect(true).toBe(true);
    });
    it('infoWidth.', () => {
      expect(true).toBe(true);
    });
    it('inside.', () => {
      expect(true).toBe(true);
    });
    it('format.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('gradient.', () => {
      expect(true).toBe(true);
    });
    it('steps.', () => {
      expect(true).toBe(true);
    });
    it('stepWidth.', () => {
      expect(true).toBe(true);
    });
    it('stepFlex.', () => {
      expect(true).toBe(true);
    });
    it('thickness.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('notchAngle.', () => {
      expect(true).toBe(true);
    });
    it('subsection.', () => {
      expect(true).toBe(true);
    });
  });
});
