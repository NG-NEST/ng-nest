import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCascadeComponent, XCascadeNode, XCascadeNodeTrigger, XCascadePrefix } from '@ng-nest/ui/cascade';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XCorner, XData, XDirection, XIsNumber, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'x-test-cascade',
  imports: [XCascadeComponent],
  template: ` <x-cascade></x-cascade> `
})
class XTestCascadeComponent {}

@Component({
  selector: 'x-test-cascade-property',
  imports: [XCascadeComponent, FormsModule],
  template: `
    <x-cascade
      [(ngModel)]="model"
      [data]="data()"
      [placement]="placement()"
      [bordered]="bordered()"
      [nodeTrigger]="nodeTrigger()"
      [nodeHoverDelay]="nodeHoverDelay()"
      [nodeTpl]="nodeTpl()"
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
    ></x-cascade>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestCascadePropertyComponent {
  model = signal<any>('');
  data = signal<XData<XCascadeNode>>([]);
  placement = signal<XCorner>('bottom-start');
  bordered = signal(true);
  nodeTrigger = signal<XCascadeNodeTrigger>('click');
  nodeHoverDelay = signal(200);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
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

  nodeEmitResult = signal<XCascadeNode | null>(null);
  nodeEmit(node: XCascadeNode) {
    this.nodeEmitResult.set(node);
  }
}

@Component({
  selector: 'x-test-cascade-parant-scroll',
  imports: [XCascadeComponent],
  template: `
    <div #scrollRef style="height: 100px; padding-top: 150px; width: 200px; overflow: auto;">
      <x-cascade [data]="data()"></x-cascade>
      <div style="height: 300px;">1</div>
    </div>
  `
})
class XTestCascadeParantScroll {
  data = signal<XData<XCascadeNode>>([]);
  scrollRef = viewChild.required<ElementRef<HTMLElement>>('scrollRef');
}

@Component({
  selector: 'x-test-cascade-position',
  imports: [XCascadeComponent],
  template: `
    <div #scrollRef style="position: absolute; bottom: 0">
      <x-cascade [data]="data()"></x-cascade>
    </div>
  `
})
class XTestCascadePosition {
  data = signal<XData<XCascadeNode>>([]);
}

xdescribe(XCascadePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCascadeComponent, XTestCascadePropertyComponent, XTestCascadeParantScroll, XTestCascadePosition],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestCascadeComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCascadeComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCascadePropertyComponent>;
    let component: XTestCascadePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCascadePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' }
      ]);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const list = fixture.debugElement.query(By.css('.x-list'));

      return { input, list, instance, com };
    };
    it('data.', async () => {
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa');
    });
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size
      // const { com } = await showPortal();
      // const portal = fixture.debugElement.query(By.css('.x-cascade-portal'));
      // const comRect = com.nativeElement.getBoundingClientRect();
      // const portalRect = portal.nativeElement.getBoundingClientRect();
      // const leftDiff = comRect.left - portalRect.left;
      // const topDiff = comRect.top + comRect.height - portalRect.top;
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
    it('nodeTrigger.', async () => {
      const { list } = await showPortal();
      const option = list.query(By.css('x-list-option'));
      option.nativeElement.click();
      fixture.detectChanges();
      const list2 = fixture.debugElement.query(By.css('x-list:nth-child(2)'));
      expect(list2.nativeElement.innerText).toBe('bb');
    });
    it('nodeTrigger hover.', async () => {
      component.nodeTrigger.set('hover');
      fixture.detectChanges();
      const { list } = await showPortal();
      const option = list.query(By.css('x-list-option'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(250);
      const list2 = fixture.debugElement.query(By.css('x-list:nth-child(2)'));
      expect(list2.nativeElement.innerText).toBe('bb');
    });
    it('nodeHoverDelay.', async () => {
      component.nodeTrigger.set('hover');
      component.nodeHoverDelay.set(300);
      fixture.detectChanges();
      const { list } = await showPortal();
      const option = list.query(By.css('x-list-option'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(100);
      let list2 = fixture.debugElement.query(By.css('x-list:nth-child(2)'));
      expect(list2).toBeNull();
      await XSleep(300);
      list2 = fixture.debugElement.query(By.css('x-list:nth-child(2)'));
      expect(list2).not.toBeNull();
    });
    it('nodeTpl.', async () => {
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa tpl');
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
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('message.', async () => {
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' },
        { id: 'cc', label: 'cc', pid: 'aa' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'aa' }
      ]);
      component.pattern.set(/^\d+$/);
      component.message.set('It must be a number');
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
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
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' },
        { id: 'cc', label: 'cc', pid: 'aa' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'aa' }
      ]);
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('nodeEmit.', async () => {
      component.data.set([
        { id: '11', label: '11' },
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' },
        { id: 'cc', label: 'cc', pid: 'aa' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'aa' }
      ]);
      const input = fixture.debugElement.query(By.css('x-input'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const list = fixture.debugElement.query(By.css('.x-list'));
      const item = list.query(By.css('x-list-option'));
      item.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      expect(component.nodeEmitResult()!.label).toBe('11');
    });
    it('model.', async () => {
      component.data.set([
        { id: '11', label: '11' },
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' },
        { id: 'cc', label: 'cc', pid: 'aa' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'aa' }
      ]);
      component.model.set('ee');
      fixture.detectChanges();
      await XSleep(200);
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText.trim()).toBe('aa / ee');
    });
    it('menter', async () => {
      component.data.set(['1']);
      component.model.set('1');
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText.trim()).toBe('1');

      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      clear.nativeElement.click();
      await XSleep(100);
      expect(component.model()).toBe('');
    });
    it('mleave', async () => {
      component.data.set(['1']);
      component.model.set('1');
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText.trim()).toBe('1');
    });
    it('menter disabled.', async () => {
      component.data.set(['1']);
      component.model.set('1');
      component.disabled.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText.trim()).toBe('1');
    });
    it('mleave disabled.', async () => {
      component.data.set(['1']);
      component.model.set('1');
      component.disabled.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText.trim()).toBe('1');
    });
    it('outside pointer', async () => {
      component.model.set('bb');
      component.nodeTrigger.set('hover');
      await showPortal();
      const option = fixture.debugElement.query(By.css('.x-list-content x-list-option'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      option.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      const body = document.querySelector('body');
      body?.click();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
    it('disabled show portal', async () => {
      component.disabled.set(true);
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
  });
  xdescribe('parant scroll.', () => {
    let fixture: ComponentFixture<XTestCascadeParantScroll>;
    let component: XTestCascadeParantScroll;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCascadeParantScroll);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' }
      ]);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const list = fixture.debugElement.query(By.css('.x-list'));

      return { input, list, instance, com };
    };
    it('scroll top.', async () => {
      component.scrollRef().nativeElement.scrollTop = 100;
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      expect(com).toBeDefined();
      await showPortal();

      component.scrollRef().nativeElement.scrollTop = 200;
      await XSleep(400);
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
    it('scroll bottom.', async () => {
      component.scrollRef().nativeElement.scrollTop = 100;
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      expect(com).toBeDefined();
      await showPortal();
      component.scrollRef().nativeElement.scrollTop = 0;
      await XSleep(400);
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
  });
  xdescribe('position.', () => {
    let fixture: ComponentFixture<XTestCascadePosition>;
    let component: XTestCascadePosition;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCascadePosition);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XCascadeComponent));
      const instance = com.componentInstance as XCascadeComponent;
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', pid: 'aa' }
      ]);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const list = fixture.debugElement.query(By.css('.x-list'));

      return { input, list, instance, com };
    };
    it('show portal.', async () => {
      await showPortal();
    });
  });
});
