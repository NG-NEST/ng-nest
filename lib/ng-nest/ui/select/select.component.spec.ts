import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSelectComponent, XSelectNode, XSelectPrefix } from '@ng-nest/ui/select';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  XAlign,
  XComputedStyle,
  XData,
  XDirection,
  XIsNumber,
  XJustify,
  XPlacement,
  XSize,
  XSleep,
  XTemplate
} from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [XSelectComponent],
  template: ` <x-select></x-select> `
})
class XTestSelectComponent {}

@Component({
  imports: [XSelectComponent, FormsModule],
  template: `
    <x-select
      [(ngModel)]="model"
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
      [portalHeight]="portalHeight()"
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
      <div>{{ node?.label }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestSelectPropertyComponent {
  model = signal<string[] | string>('');
  data = signal<XData<XSelectNode>>([]);
  width = signal('');
  clearable = signal(true);
  async = signal(false);
  placement = signal<XPlacement>('bottom');
  multiple = signal(false);
  selectAll = signal(false);
  selectAllText = signal('');
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
  bordered = signal(true);
  portalMaxHeight = signal('12rem');
  portalHeight = signal('');
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

xdescribe(XSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSelectComponent, XTestSelectPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
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
    const closePortal = async (multiple = false) => {
      if (!multiple) {
        const option = fixture.debugElement.query(By.css('x-list-option'));
        option.nativeElement.click();
        await XSleep(300);
      } else {
        const input = fixture.debugElement.query(By.css('.x-input-frame'));
        input.nativeElement.click();
      }
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
      const select = fixture.debugElement.query(By.css('x-select'));
      expect(select.nativeElement.clientWidth).toBe(100);
    });
    it('clearable.', async () => {
      component.clearable.set(true);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list).toBeTruthy();
      await closePortal();

      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      expect(clear).toBeTruthy();
    });
    it('async.', async () => {
      component.async.set(true);
      component.data.set(
        new Observable<string[]>((x) => {
          setTimeout(() => {
            x.next(['aa', 'bb']);
            x.complete();
          }, 500);
        })
      );
      fixture.detectChanges();
      await showPortal();
      const loading = fixture.debugElement.query(By.css('.fto-loader'));
      expect(loading).toBeTruthy();
      await XSleep(200);
      await closePortal();
    });
    it('placement.', () => {
      // cdk overlay. Restricted by browser window size
      expect(true).toBe(true);
    });
    it('multiple.', async () => {
      component.multiple.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      component.model.set(['aa', 'bb']);
      fixture.detectChanges();
      await XSleep(100);
      const tags = fixture.debugElement.queryAll(By.css('.x-input-value-template-value x-tag'));
      expect(tags.length).toBe(2);
      await showPortal();
      const selectedOptions = fixture.debugElement.queryAll(By.css('.x-list-option.x-selected'));
      expect(selectedOptions.length).toBe(2);
      await closePortal(true);
    });
    it('selectAll.', async () => {
      component.multiple.set(true);
      component.selectAll.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      await showPortal();
      const selectAll = fixture.debugElement.query(By.css('.x-list-select-all x-list-option'));
      expect(selectAll).toBeTruthy();
      selectAll.nativeElement.click();
      await closePortal(true);
      await XSleep(100);
      const tags = fixture.debugElement.queryAll(By.css('.x-input-value-template-value x-tag'));
      expect(tags.length).toBe(3);
    });
    it('selectAllText.', async () => {
      component.multiple.set(true);
      component.selectAll.set(true);
      component.selectAllText.set('select all');
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      await showPortal();
      const selectAll = fixture.debugElement.query(By.css('.x-list-select-all x-list-option'));
      expect(selectAll).toBeTruthy();
      expect(selectAll.nativeElement.innerText).toBe('select all');
    });
    it('nodeTpl.', async () => {
      component.nodeTpl.set(component.nodeTemplate());
      component.data.set(['aa']);
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa tpl');
      await closePortal();
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('portalMaxHeight.', async () => {
      component.portalMaxHeight.set('300px');
      component.data.set(['aa']);
      fixture.detectChanges();
      await showPortal();
      const portal = document.querySelector('.x-select-portal') as HTMLDivElement;
      expect(XComputedStyle(portal, 'max-height')).toBe('300');
      await closePortal();
    });
    it('portalWidth.', async () => {
      component.data.set(['aa']);
      component.portalWidth.set('150px');
      fixture.detectChanges();
      await showPortal();
      const portal = document.querySelector('.x-select-portal') as HTMLDivElement;
      expect(portal.clientWidth).toBe(150);
      await closePortal();
    });
    it('search.', async () => {
      component.search.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const autoComplete = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = autoComplete.componentInstance as XSelectComponent;
      instance.displayValue.set('a');
      fixture.detectChanges();
      await XSleep(50);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const option = document.querySelector('.x-list-option')! as HTMLDivElement;
      expect(option.innerText).toBe('aa');
      await closePortal();
    });
    it('caseSensitive.', async () => {
      component.search.set(true);
      component.caseSensitive.set(false);
      component.data.set(['aa', 'bb', 'cc', 'AA']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const autoComplete = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = autoComplete.componentInstance as XSelectComponent;
      instance.displayValue.set('A');
      fixture.detectChanges();
      await XSleep(50);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const option = document.querySelector('.x-list-option')! as HTMLDivElement;
      expect(option.innerText).toBe('aa');
      await closePortal();
    });
    it('debounceTime.', async () => {
      component.search.set(true);
      component.debounceTime.set(500);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const autoComplete = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = autoComplete.componentInstance as XSelectComponent;
      instance.displayValue.set('a');
      fixture.detectChanges();
      await XSleep(500);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const option = document.querySelector('.x-list-option')! as HTMLDivElement;
      expect(option.innerText).toBe('aa');
      await closePortal();
    });
    it('maxTagCount.', async () => {
      component.multiple.set(true);
      component.maxTagCount.set(2);
      component.data.set(['aa', 'bb', 'cc', 'dd']);
      component.model.set(['aa', 'bb', 'cc', 'dd']);
      fixture.detectChanges();
      await XSleep(100);
      const tags = fixture.debugElement.queryAll(By.css('.x-input-value-template-value x-tag'));
      expect(tags.length).toBe(3);
    });
    it('maxTagContent.', async () => {
      component.multiple.set(true);
      component.maxTagCount.set(2);
      component.maxTagContent.set('more {{surplus}} selected');
      component.data.set(['aa', 'bb', 'cc', 'dd']);
      component.model.set(['aa', 'bb', 'cc', 'dd']);
      fixture.detectChanges();
      await XSleep(100);
      const tag = fixture.debugElement.query(By.css('.x-input-value-template-value x-tag:nth-child(3)'));
      expect(tag.nativeElement.innerText).toBe('more 2 selected');
    });
    it('virtualScroll.', async () => {
      component.data.set(Array.from({ length: 100 }).map((_, index) => `aa${index + 1}`));
      component.virtualScroll.set(true);
      component.portalHeight.set('15rem');
      fixture.detectChanges();
      await showPortal();
      const options = document.querySelectorAll('x-list-option');
      expect(options.length < 100).toBe(true);
      await closePortal();
    });
    it('allowInput.', async () => {
      component.search.set(true);
      component.allowInput.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const autoComplete = fixture.debugElement.query(By.directive(XSelectComponent));
      const instance = autoComplete.componentInstance as XSelectComponent;
      instance.displayValue.set('aa');
      fixture.detectChanges();
      await XSleep(50);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const option = document.querySelector('.x-list-option')! as HTMLDivElement;
      expect(option.innerText).toBe('aa');
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
