import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAutoCompleteComponent, XAutoCompleteNode, XAutoCompletePrefix } from '@ng-nest/ui/auto-complete';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  XAlign,
  XData,
  XDirection,
  XIsNumber,
  XJustify,
  XPositionTopBottom,
  XSize,
  XSleep,
  XTemplate
} from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XAutoCompleteComponent],
  template: ` <x-auto-complete></x-auto-complete> `
})
class XTestAutoCompleteComponent {}

@Component({
  standalone: true,
  imports: [XAutoCompleteComponent],
  template: `
    <x-auto-complete
      [data]="data()"
      [debounceTime]="debounceTime()"
      [placement]="placement()"
      [nodeTpl]="nodeTpl()"
      [bordered]="bordered()"
      [caseSensitive]="caseSensitive()"
      [onlySelect]="onlySelect()"
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
    ></x-auto-complete>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      <div>{{ node.label }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestAutoCompletePropertyComponent {
  data = signal<XData<XAutoCompleteNode>>([]);
  debounceTime = signal(200);
  placement = signal<XPositionTopBottom>('bottom');
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
  bordered = signal(true);
  caseSensitive = signal(true);
  onlySelect = signal(false);
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

  nodeEmitResult = signal<XAutoCompleteNode | null>(null);
  nodeEmit(node: XAutoCompleteNode) {
    this.nodeEmitResult.set(node);
  }
}

describe(XAutoCompletePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAutoCompleteComponent, XTestAutoCompletePropertyComponent],
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
    let fixture: ComponentFixture<XTestAutoCompleteComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestAutoCompleteComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAutoCompletePropertyComponent>;
    let component: XTestAutoCompletePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAutoCompletePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      instance.value.set('a');
      fixture.detectChanges();
      await XSleep(50);
      const event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      const change = new Event('change', { bubbles: true });
      input.nativeElement.dispatchEvent(change);
      fixture.detectChanges();

      await XSleep(300);
      const list = fixture.debugElement.query(By.css('.x-list'));

      return { input, list, instance };
    };
    const closePortal = async () => {
      const item = fixture.debugElement.query(By.css('.x-list x-list-option'));
      item?.nativeElement?.click();
      fixture.detectChanges();
      await XSleep(100);
    };
    it('data.', async () => {
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa');
      await closePortal();
    });
    it('debounceTime.', async () => {
      const { list } = await showPortal();
      expect(list).toBeDefined();
      await closePortal();
    });
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size

      // const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      // await showPortal();

      // const portal = fixture.debugElement.query(By.css('.x-auto-complete-portal'));
      // const autoCompleteRect = autoComplete.nativeElement.getBoundingClientRect();
      // const portalRect = portal.nativeElement.getBoundingClientRect();
      // const leftDiff = autoCompleteRect.left - portalRect.left;
      // const topDiff = autoCompleteRect.top + autoCompleteRect.height - portalRect.top;
      // // Pixels may be decimal points
      // expect(leftDiff >= -1 && leftDiff <= 1).toBe(true);
      // expect(topDiff >= -1 && topDiff <= 1).toBe(true);

      // await closePortal();
    });
    it('nodeTpl.', async () => {
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa tpl');
      await closePortal();
    });
    it('bordered.', async () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('caseSensitive.', async () => {
      const { input, list, instance } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa');

      input.nativeElement.focus();
      instance.value.set('A');
      const event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      const change = new Event('change', { bubbles: true });
      input.nativeElement.dispatchEvent(change);
      fixture.detectChanges();

      await XSleep(300);
      const listContent = fixture.debugElement.query(By.css('.x-list-content'));
      expect(listContent.nativeElement.innerText).toBe('');

      await closePortal();
    });
    it('onlySelect.', async () => {
      component.onlySelect.set(true);
      fixture.detectChanges();
      let { instance } = await showPortal();
      instance.closePortal();
      fixture.detectChanges();
      expect(instance.value()).toBe('');
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
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
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
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
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
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('nodeEmit.', async () => {
      const { list } = await showPortal();
      const item = list.query(By.css('x-list-option'));
      item.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      expect(component.nodeEmitResult()!.id).toBe('aa');
    });
  });
});
