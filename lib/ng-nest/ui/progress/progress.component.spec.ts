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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XComputedStyle } from '../core';

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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestProgressPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestProgressPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      const progress = fixture.debugElement.query(By.css('.x-progress')).nativeElement;
      expect(progress).toHaveClass('x-progress-line');
      component.type.set('circle');
      fixture.detectChanges();
      expect(progress).toHaveClass('x-progress-circle');
      component.type.set('dashboard');
      fixture.detectChanges();
      expect(progress).toHaveClass('x-progress-dashboard');
    });
    it('percent.', () => {
      component.percent.set(80);
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-progress-text')).nativeElement;
      const bg = fixture.debugElement.query(By.css('.x-progress-bg')).nativeElement;
      const rail = fixture.debugElement.query(By.css('.x-progress-rail')).nativeElement;
      expect(text.innerText).toBe('80%');
      const diff = Math.floor((bg.clientWidth / rail.clientWidth) * 100) - 80;
      expect(diff >= -1 && diff <= 1).toBe(true);
    });
    it('height.', () => {
      component.height.set('100px');
      fixture.detectChanges();
      const bg = fixture.debugElement.query(By.css('.x-progress-bg')).nativeElement;
      expect(bg.clientHeight).toBe(100);
    });
    it('status.', () => {
      component.status.set('success');
      fixture.detectChanges();
      const progress = fixture.debugElement.query(By.css('.x-progress')).nativeElement;
      expect(progress).toHaveClass('x-progress-success');
    });
    it('info.', () => {
      component.info.set(false);
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-progress-text')).nativeElement;
      expect(text).toBeFalsy();
    });
    it('infoWidth.', () => {
      component.infoWidth.set('100px');
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-progress-text')).nativeElement;
      expect(text.clientWidth).toBe(100);
    });
    it('inside.', () => {
      component.inside.set(true);
      component.height.set('50px');
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-progress-bg .x-progress-text'));
      expect(text).toBeTruthy();
    });
    it('format.', () => {
      component.format.set((percent: number) => {
        return percent === 100 ? '已完成' : '加载中' + percent + '%';
      });
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-progress-text')).nativeElement;
      expect(text.innerText).toBe('加载中0%');
    });
    it('color.', () => {
      component.color.set('rgb(0, 255, 0)');
      fixture.detectChanges();
      const bg = fixture.debugElement.query(By.css('.x-progress-bg')).nativeElement;
      expect(XComputedStyle(bg, 'color')).toBe('rgb(0, 255, 0)');
    });
    it('gradient.', () => {
      component.gradient.set({ from: '#3B82F6', to: '#f56c6c' });
      component.percent.set(80);
      fixture.detectChanges();
      const bg = fixture.debugElement.query(By.css('.x-progress-bg')).nativeElement;
      expect(XComputedStyle(bg, 'background-image')).toBe(`linear-gradient(to right, #3B82F6, #f56c6c)`);
    });
    it('steps.', () => {
      component.percent.set(50);
      component.steps.set(5);
      fixture.detectChanges();
      const progress = fixture.debugElement.query(By.css('.x-progress')).nativeElement;
      expect(progress).toHaveClass('x-progress-steps');
      const steps = fixture.debugElement.queryAll(By.css('.x-progress-step'));
      expect(steps.length).toBe(5);
      const actives = fixture.debugElement.queryAll(By.css('.x-progress-step.x-progress-step-active'));
      expect(actives.length).toBe(3);
    });
    it('stepWidth.', () => {
      component.percent.set(50);
      component.steps.set(5);
      component.stepWidth.set('100px');
      fixture.detectChanges();
      const step = fixture.debugElement.query(By.css('.x-progress-step'));
      expect(step.nativeElement.clientWidth).toBe(100);
    });
    it('stepFlex.', () => {
      component.stepFlex.set(true);
      component.percent.set(50);
      component.steps.set(5);
      fixture.detectChanges();
      const steps = fixture.debugElement.queryAll(By.css('.x-progress-step'));
      for (let step of steps) {
        expect(XComputedStyle(step.nativeElement, 'flex')).toBe('1');
      }
    });
    it('thickness.', () => {
      component.type.set('circle');
      component.thickness.set('50px');
      component.percent.set(50);
      fixture.detectChanges();
      const rail = fixture.debugElement.query(By.css('.x-progress-ring-rail')).nativeElement;
      const bg = fixture.debugElement.query(By.css('.x-progress-ring-bg')).nativeElement;
      expect(XComputedStyle(rail, 'border-width')).toBe('50px');
      expect(XComputedStyle(bg, 'border-width')).toBe('50px');
    });
    it('size.', () => {
      component.size.set('200px');
      component.type.set('circle');
      component.percent.set(50);
      fixture.detectChanges();
      const ring = fixture.debugElement.query(By.css('.x-progress-ring')).nativeElement;
      expect(ring.clientHeight).toBe(200);
      expect(ring.clientWidth).toBe(200);
    });
    it('notchAngle.', () => {
      component.type.set('dashboard');
      component.notchAngle.set(40);
      component.percent.set(50);
      fixture.detectChanges();
      const rail = fixture.debugElement.query(By.css('.x-progress-ring-rail')).nativeElement;
      const bg = fixture.debugElement.query(By.css('.x-progress-ring-bg')).nativeElement;
      console.log(rail, bg);
    });
    it('subsection.', () => {
      component.subsection.set(true);
      component.color.set([
        { color: '#f56c6c', percent: 20 },
        { color: '#e6a23c', percent: 40 },
        { color: '#5cb87a', percent: 60 },
        { color: '#1989fa', percent: 80 }
      ]);
      fixture.detectChanges();
      const rail = fixture.debugElement.query(By.css('.x-progress-rail'));
      expect(rail.nativeElement).toHaveClass('x-progress-mask');
    });
  });
});
