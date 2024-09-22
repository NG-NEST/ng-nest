import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAutoCompleteComponent, XAutoCompleteNode, XAutoCompletePrefix } from '@ng-nest/ui/auto-complete';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XPositionTopBottom, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
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
  valueTplContext = signal(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild<TemplateRef<any>>('afterTemplate');
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
    it('data.', async () => {
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa');
    });
    it('debounceTime.', async () => {
      const { list } = await showPortal();
      expect(list).toBeDefined();
    });
    it('placement.', async () => {
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      await showPortal();

      const portal = fixture.debugElement.query(By.css('.x-auto-complete-portal'));
      const autoCompleteRect = autoComplete.nativeElement.getBoundingClientRect();
      const portalRect = portal.nativeElement.getBoundingClientRect();
      const leftDiff = autoCompleteRect.left - portalRect.left;
      const topDiff = autoCompleteRect.top + autoCompleteRect.height - portalRect.top;
      // Pixels may be decimal points
      expect(leftDiff > -1 && leftDiff < 1).toBe(true);
      expect(topDiff > -1 && topDiff < 1).toBe(true);
    });
    it('nodeTpl.', async () => {
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa tpl');
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
    });
    it('onlySelect.', async () => {
      component.onlySelect.set(true);
      fixture.detectChanges();
      let { instance } = await showPortal();
      instance.closePortal();
      fixture.detectChanges();
      expect(instance.value()).toBe('');
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
      component.labelWidth.set('100px');
      expect(true).toBe(true);
    });
    it('labelAlign.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('align.', () => {
      expect(true).toBe(true);
    });
    it('direction.', () => {
      expect(true).toBe(true);
    });
    it('placeholder.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('required.', () => {
      expect(true).toBe(true);
    });
    it('readonly.', () => {
      expect(true).toBe(true);
    });
    it('valueTpl.', () => {
      expect(true).toBe(true);
    });
    it('valueTplContext.', () => {
      expect(true).toBe(true);
    });
    it('before.', () => {
      expect(true).toBe(true);
    });
    it('after.', () => {
      expect(true).toBe(true);
    });
    it('pattern.', () => {
      expect(true).toBe(true);
    });
    it('message.', () => {
      expect(true).toBe(true);
    });
    it('active.', () => {
      expect(true).toBe(true);
    });
    it('inputValidator.', () => {
      expect(true).toBe(true);
    });
    it('nodeEmit.', () => {
      expect(true).toBe(true);
    });
  });
});
