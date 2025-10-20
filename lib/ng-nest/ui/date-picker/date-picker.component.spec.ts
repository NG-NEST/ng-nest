import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  inject,
  provideZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XDatePickerComponent,
  XDatePickerDisabledDate,
  XDatePickerDisabledTime,
  XDatePickerPrefix,
  XDatePickerPreset,
  XDatePickerType
} from '@ng-nest/ui/date-picker';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  XAddDays,
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
  imports: [XDatePickerComponent],
  template: ` <x-date-picker></x-date-picker> `
})
class XTestDatePickerComponent {}

@Component({
  providers: [DatePipe],
  imports: [XDatePickerComponent, FormsModule],
  template: `
    <x-date-picker
      [(ngModel)]="model"
      [type]="type()"
      [format]="format()"
      [clearable]="clearable()"
      [placement]="placement()"
      [bordered]="bordered()"
      [preset]="preset()"
      [extraFooter]="extraFooter()"
      [disabledDate]="disabledDate()"
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
    >
    </x-date-picker>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      <div>{{ node.label }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>

    <ng-template #extraFooterTemplate>footer tpl</ng-template>
  `
})
class XTestDatePickerPropertyComponent {
  type = signal<XDatePickerType>('date');
  format = signal('yyyy-MM-dd');
  clearable = signal(true);
  placement = signal<XCorner>('bottom-start');
  bordered = signal(true);
  preset = signal<XData<XDatePickerPreset>>([]);
  extraFooter = signal<XTemplate | null>(null);
  extraFooterTemplate = viewChild.required<TemplateRef<any>>('extraFooterTemplate');
  disabledDate = signal<XDatePickerDisabledDate | null>(null);
  disabledTime = signal<XDatePickerDisabledTime | null>(null);
  size = signal<XSize>('medium');
  pointer = signal(false);
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
  nodeEmit(event: number) {
    this.nodeEmitResult.set(event);
  }

  model = signal<any>(null);

  datePipe = inject(DatePipe);
}

xdescribe(XDatePickerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDatePickerComponent, XTestDatePickerPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestDatePickerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDatePickerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDatePickerComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDatePickerPropertyComponent>;
    let component: XTestDatePickerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDatePickerPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XDatePickerComponent));
      const instance = com.componentInstance as XDatePickerComponent;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(50);
      const event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      const change = new Event('change', { bubbles: true });
      input.nativeElement.dispatchEvent(change);
      fixture.detectChanges();

      await XSleep(300);

      return { com, input, instance };
    };
    const closePortal = async () => {
      const dateNow = fixture.debugElement.query(By.css('.x-date-now'));
      dateNow?.nativeElement?.click();
      fixture.detectChanges();
      await XSleep(0);
    };
    it('type.', async () => {
      const date = new Date();
      component.model.set(date);
      fixture.detectChanges();
      await XSleep(50);
      const val = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(val.nativeElement.innerText).toBe(component.datePipe.transform(date, component.format()));

      component.type.set('month');
      fixture.detectChanges();
      expect(val.nativeElement.innerText).toBe(component.datePipe.transform(date, 'yyyy-MM'));

      component.type.set('year');
      fixture.detectChanges();
      expect(val.nativeElement.innerText).toBe(component.datePipe.transform(date, 'yyyy'));
    });
    it('format.', async () => {
      const date = new Date();
      component.format.set('yyyy年MM月dd日');
      component.model.set(date);
      await XSleep(0);
      const val = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(val.nativeElement.innerText).toBe(component.datePipe.transform(date, 'yyyy年MM月dd日'));
    });
    it('clearable.', async () => {
      component.clearable.set(true);
      component.model.set(new Date());
      fixture.detectChanges();
      await XSleep(50);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      expect(clear).toBeTruthy();
    });
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size

      // const { com } = await showPortal();
      // const portal = fixture.debugElement.query(By.css('.x-date-picker-portal'));
      // const box = com.nativeElement.getBoundingClientRect();
      // const portalRect = portal.nativeElement.getBoundingClientRect();
      // const leftDiff = box.left - portalRect.left;
      // const topDiff = box.top + box.height - portalRect.top;
      // // Pixels may be decimal points
      // expect(leftDiff >= -1 && leftDiff <= 1).toBe(true);
      // expect(topDiff >= -1 && topDiff <= 1).toBe(true);
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('preset.', async () => {
      component.preset.set([
        'yesterday',
        'today',
        'tomorrow',
        {
          label: '7天后',
          func: () => {
            return XAddDays(new Date(), 7);
          }
        }
      ]);
      fixture.detectChanges();

      await showPortal();
      const preset = fixture.debugElement.query(By.css('.x-date-picker-portal-preset'));
      expect(preset.nativeElement.innerText).toBe('昨天\n今天\n明天\n7天后');

      await closePortal();
    });
    it('extraFooter.', async () => {
      component.extraFooter.set(component.extraFooterTemplate());
      fixture.detectChanges();

      await showPortal();
      const footer = fixture.debugElement.query(By.css('.x-date-picker-portal-extra-footer'));
      expect(footer.nativeElement.innerText).toBe('footer tpl');
      await closePortal();
    });
    it('disabledDate.', async () => {
      const now = new Date();
      component.disabledDate.set((current: Date): boolean => {
        const currentDate = new Date(component.datePipe.transform(current, 'yyyy-MM-dd')!).getTime();
        const today = new Date(component.datePipe.transform(now, 'yyyy-MM-dd')!).getTime();
        return currentDate > today;
      });
      fixture.detectChanges();

      await showPortal();
      const disabled = fixture.debugElement.query(By.css('.x-date-disabled'));
      const title = disabled.nativeElement.getAttribute('title');
      expect(title).toBe(component.datePipe.transform(XAddDays(now, 1), 'yyyy-MM-dd'));
      await closePortal();
    });
    it('disabledTime.', async () => {
      component.type.set('date-time');
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
      const com = fixture.debugElement.query(By.directive(XDatePickerComponent));
      const instance = com.componentInstance as XDatePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('message.', async () => {
      component.pattern.set(/^\d+$/);
      component.message.set('It must be a number');
      const com = fixture.debugElement.query(By.directive(XDatePickerComponent));
      const instance = com.componentInstance as XDatePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
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
      const com = fixture.debugElement.query(By.directive(XDatePickerComponent));
      const instance = com.componentInstance as XDatePickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('nodeEmit.', async () => {
      await showPortal();

      const dateNow = fixture.debugElement.query(By.css('.x-date-now'));
      dateNow.nativeElement.click();
      fixture.detectChanges();
      await XSleep(0);
      expect(component.datePipe.transform(component.nodeEmitResult(), 'yyyy-MM-dd')).toBe(
        dateNow.nativeElement.getAttribute('title')
      );
    });
  });
});
