import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  inject,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XTimePickerComponent,
  XTimePickerDisabledTime,
  XTimePickerPrefix,
  XTimePickerPreset,
  XTimePickerType
} from '@ng-nest/ui/time-picker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  XAddHours,
  XAlign,
  XCorner,
  XData,
  XDirection,
  XIsNumber,
  XJustify,
  XSize,
  XSleep,
  XTemplate
} from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  imports: [XTimePickerComponent],
  template: ` <x-time-picker></x-time-picker> `
})
class XTestTimePickerComponent {}

@Component({
  imports: [XTimePickerComponent, FormsModule, DatePipe],
  providers: [DatePipe],
  template: `
    <x-time-picker
      [(ngModel)]="model"
      [type]="type()"
      [format]="format()"
      [placement]="placement()"
      [use12Hours]="use12Hours()"
      [bordered]="bordered()"
      [hourStep]="hourStep()"
      [minuteStep]="minuteStep()"
      [secondStep]="secondStep()"
      [preset]="preset()"
      [disabledTime]="disabledTime()"
      [size]="size()"
      [pointer]="pointer()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [required]="required()"
      [readonly]="readonly()"
      [valueTpl]="valueTpl()"
      [valueTplContext]="valueTplContext()"
      [before]="before()"
      [after]="after()"
      [pattern]="pattern()"
      [message]="message()"
      [active]="active()"
      [inputValidator]="inputValidator()"
      (nodeEmit)="nodeEmit($event)"
    ></x-time-picker>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTimePickerPropertyComponent {
  model = signal<Date | null>(null);
  type = signal<XTimePickerType>('time');
  format = signal('HH:mm:ss');
  placement = signal<XCorner>('bottom-start');
  use12Hours = signal(false);
  bordered = signal(true);
  hourStep = signal(1);
  minuteStep = signal(1);
  secondStep = signal(1);
  preset = signal<XData<XTimePickerPreset>>([]);
  disabledTime = signal<XTimePickerDisabledTime | null>(null);
  size = signal<XSize>('medium');
  pointer = signal(true);
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  placeholder = signal('');
  disabled = signal(false);
  required = signal(false);
  readonly = signal(false);
  valueTpl = signal<TemplateRef<any> | null>(null);
  valueTemplate = viewChild.required<TemplateRef<any>>('valueTemplate');
  valueTplContext = signal<any | null>(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild.required<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild.required<TemplateRef<any>>('afterTemplate');
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  active = signal(false);
  inputValidator = signal<((value: any) => boolean) | null>(null);

  nodeEmitResult = signal<number | null>(null);
  nodeEmit(value: number) {
    this.nodeEmitResult.set(value);
  }

  datePipe = inject(DatePipe);
}

describe(XTimePickerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTimePickerComponent, XTestTimePickerPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTimePickerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTimePickerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTimePickerPropertyComponent>;
    let component: XTestTimePickerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTimePickerPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      const instance = com.componentInstance as XTimePickerComponent;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();

      await XSleep(300);

      return { com, input, instance };
    };
    const closePortal = async () => {
      const body = document.querySelector('body');
      body?.click();
      // const option = fixture.debugElement.query(By.css('x-list-option'));
      // option?.nativeElement.click();
      await XSleep(300);
    };

    it('type.', async () => {
      component.type.set('hour');
      fixture.detectChanges();
      await showPortal();
      const hour = fixture.debugElement.query(By.css('.x-time-picker-frame-hour'));
      expect(hour).toBeTruthy();
      await closePortal();
    });
    it('format.', async () => {
      const now = new Date();
      component.model.set(now);
      component.format.set('HH时mm分ss秒');
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(input.nativeElement.innerText).toBe(component.datePipe.transform(now, 'HH时mm分ss秒'));
    });
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size
    });
    it('use12Hours.', async () => {
      const dt = new Date('2025/01/01 15:00:00');
      component.model.set(dt);
      component.use12Hours.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(input.nativeElement.innerText).toBe('03:00:00 下午');
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('hourStep.', async () => {
      component.hourStep.set(2);
      fixture.detectChanges();
      await showPortal();
      const hour = fixture.debugElement.query(By.css('.x-time-picker-frame-hour'));
      expect(hour).toBeTruthy();
      const hourList = hour.nativeElement.querySelectorAll('x-list-option');
      expect(hourList.length).toBe(12);
      await closePortal();
    });
    it('minuteStep.', async () => {
      component.minuteStep.set(5);
      fixture.detectChanges();
      await showPortal();
      const minute = fixture.debugElement.query(By.css('.x-time-picker-frame-minute'));
      expect(minute).toBeTruthy();
      const minuteList = minute.nativeElement.querySelectorAll('x-list-option');
      expect(minuteList.length).toBe(12);
      await closePortal();
    });
    it('secondStep.', async () => {
      component.secondStep.set(5);
      fixture.detectChanges();
      await showPortal();
      const second = fixture.debugElement.query(By.css('.x-time-picker-frame-second'));
      expect(second).toBeTruthy();
      const secondList = second.nativeElement.querySelectorAll('x-list-option');
      expect(secondList.length).toBe(12);
      await closePortal();
    });
    it('preset.', async () => {
      const now = new Date();
      component.preset.set([
        'now',
        {
          label: '1 hours before',
          func: () => {
            return XAddHours(now, -1);
          }
        },
        {
          label: '2 hours after',
          func: () => {
            return XAddHours(now, 2);
          }
        }
      ]);
      fixture.detectChanges();
      await showPortal();

      const preset = document.querySelector('.x-time-picker-portal-preset') as HTMLElement;
      expect(preset).toBeTruthy();
      const btns = preset.querySelectorAll<HTMLElement>('x-button');
      if (btns.length > 1) {
        btns.item(0).click();
        fixture.detectChanges();
        await XSleep(100);
        const input = fixture.debugElement.query(By.css('.x-input-value-template-value'));
        expect((input.nativeElement.innerText as string).split(':')[0]).toBe(
          component.datePipe.transform(XAddHours(now, -1), 'HH')!
        );

        btns.item(1).click();
        fixture.detectChanges();
        await XSleep(100);
        expect((input.nativeElement.innerText as string).split(':')[0]).toBe(
          component.datePipe.transform(XAddHours(now, 2), 'HH')!
        );
      }
      await closePortal();
    });
    it('disabledTime.', async () => {
      component.disabledTime.set(() => ({
        disabledHours: () => Array.from({ length: 12 }).map((_, i) => i),
        disabledMinutes: () => Array.from({ length: 30 }).map((_, i) => i),
        disabledSeconds: () => Array.from({ length: 40 }).map((_, i) => i)
      }));
      fixture.detectChanges();

      await showPortal();

      const hours = fixture.debugElement.queryAll(By.css('.x-time-picker-frame-hour .x-disabled'));
      expect(hours.length).toBe(12);

      const minutes = fixture.debugElement.queryAll(By.css('.x-time-picker-frame-minute .x-disabled'));
      expect(minutes.length).toBe(30);

      const seconds = fixture.debugElement.queryAll(By.css('.x-time-picker-frame-second .x-disabled'));
      expect(seconds.length).toBe(40);

      await closePortal();
    });
    it('size.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-input-large');
    });
    it('pointer.', () => {
      component.pointer.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-pointer');
    });
    it('label.', async () => {
      component.label.set('label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.innerText).toBe('label');
    });
    it('labelWidth.', () => {
      component.label.set('label');
      component.labelWidth.set('100px');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.style.width).toBe('100px');
    });
    it('labelAlign.', () => {
      component.label.set('label');
      component.labelAlign.set('end');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-text-align-end');
    });
    it('justify.', () => {
      component.label.set('label');
      component.justify.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-direction-row');
    });
    it('placeholder.', () => {
      component.placeholder.set('placeholder');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.getAttribute('placeholder')).toBe('placeholder');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.required.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.required).toBe(true);
    });
    it('readonly.', () => {
      component.readonly.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.readOnly).toBe(true);
    });
    it('valueTpl.', () => {
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('tpl');
    });
    it('valueTplContext.', () => {
      component.valueTplContext.set({ $value: 'content' });
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('content tpl');
    });
    it('before.', () => {
      component.before.set(component.beforeTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-before'));
      expect(tpl.nativeElement.innerText).toBe('before');
    });
    it('after.', () => {
      component.after.set(component.afterTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-after'));
      expect(tpl.nativeElement.innerText).toBe('after');
    });
    it('pattern.', () => {
      component.pattern.set(/^\d+$/);
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      const instance = com.componentInstance as XTimePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('2024-1-1 10:00:00');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('message.', async () => {
      component.pattern.set(/^\d+$/);
      component.message.set('It must be a number');
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      const instance = com.componentInstance as XTimePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('2024-1-1 10:00:00');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-input-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('active.', () => {
      component.active.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-active');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      const instance = com.componentInstance as XTimePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('2024-1-1 10:00:00');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
  });
});
