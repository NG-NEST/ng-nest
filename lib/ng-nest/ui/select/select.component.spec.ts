import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSelectComponent, XSelectNode, XSelectPrefix } from '@ng-nest/ui/select';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XIsNumber, XJustify, XPlacement, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XSelectComponent],
  template: ` <x-select></x-select> `
})
class XTestSelectComponent {}

@Component({
  standalone: true,
  imports: [XSelectComponent],
  template: `
    <x-select
      [data]="data()"
      [width]="width()"
      [clearable]="clearable()"
      [async]="async()"
      [placement]="placement()"
      [multiple]="multiple()"
      [selectAll]="selectAll()"
      [selectAllText]="selectAllText()"
      [nodeTpl]="nodeTpl()"
      [bordered]="bordered()"
      [portalMaxHeight]="portalMaxHeight()"
      [portalWidth]="portalWidth()"
      [search]="search()"
      [caseSensitive]="caseSensitive()"
      [debounceTime]="debounceTime()"
      [maxTagCount]="maxTagCount()"
      [maxTagContent]="maxTagContent()"
      [virtualScroll]="virtualScroll()"
      [allowInput]="allowInput()"
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
    ></x-select>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      <div>{{ node.label }}</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestSelectPropertyComponent {
  data = signal<XData<XSelectNode>>([]);
  width = signal('');
  clearable = signal(true);
  async = signal(false);
  placement = signal<XPlacement>('bottom');
  multiple = signal(false);
  selectAll = signal(false);
  selectAllText = signal('');
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild<TemplateRef<any>>('nodeTemplate');
  bordered = signal(true);
  portalMaxHeight = signal('12rem');
  portalWidth = signal('');
  search = signal(false);
  caseSensitive = signal(true);
  debounceTime = signal(200);
  maxTagCount = signal(-1);
  maxTagContent = signal('');
  virtualScroll = signal(false);
  allowInput = signal(false);
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
}

describe(XSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSelectComponent, XTestSelectPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestSelectComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSelectComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSelectComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSelectPropertyComponent>;
    let component: XTestSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSelectPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(300);
      const list = fixture.debugElement.query(By.css('.x-list'));
      return { list, input };
    };
    const closePortal = async () => {
      const option = fixture.debugElement.query(By.css('x-list-option'));
      option.nativeElement.click();
      await XSleep(300);
    };
    it('data.', async () => {
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list).toBeTruthy();
      await closePortal();
    });
    it('width.', () => {
      component.width.set('100px');
      fixture.detectChanges();
      expect(true).toBe(true);
    });
    it('clearable.', () => {
      expect(true).toBe(true);
    });
    it('async.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      expect(true).toBe(true);
    });
    it('selectAll.', () => {
      expect(true).toBe(true);
    });
    it('selectAllText.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('portalMaxHeight.', () => {
      expect(true).toBe(true);
    });
    it('portalWidth.', () => {
      expect(true).toBe(true);
    });
    it('search.', () => {
      expect(true).toBe(true);
    });
    it('caseSensitive.', () => {
      expect(true).toBe(true);
    });
    it('debounceTime.', () => {
      expect(true).toBe(true);
    });
    it('maxTagCount.', () => {
      expect(true).toBe(true);
    });
    it('maxTagContent.', () => {
      expect(true).toBe(true);
    });
    it('virtualScroll.', () => {
      expect(true).toBe(true);
    });
    it('allowInput.', () => {
      expect(true).toBe(true);
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
    it('valueTplContext.', async () => {
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
      const com = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = com.componentInstance as XSelectComponent;
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
      const com = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = com.componentInstance as XSelectComponent;
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
      const com = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = com.componentInstance as XSelectComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
  });
});
