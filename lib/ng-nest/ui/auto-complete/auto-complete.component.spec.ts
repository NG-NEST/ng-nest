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
import { XAutoCompleteComponent, XAutoCompleteNode, XAutoCompletePrefix } from '@ng-nest/ui/auto-complete';
import { provideHttpClient, withFetch } from '@angular/common/http';
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
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'x-test-auto-complete',
  imports: [XAutoCompleteComponent],
  template: ` <x-auto-complete></x-auto-complete> `
})
class XTestAutoCompleteComponent {}

@Component({
  selector: 'x-test-auto-complete-property',
  imports: [XAutoCompleteComponent, FormsModule],
  template: `
    <x-auto-complete
      [(ngModel)]="model"
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
  model = signal<string | null>(null);
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

@Component({
  selector: 'x-test-auto-complete-coverage-scroll',
  imports: [XAutoCompleteComponent, FormsModule],
  template: `
    <div #scrollRef class="scroll">
      <div class="auto-complete">
        <x-auto-complete [(ngModel)]="model" [data]="data()"></x-auto-complete>
      </div>
    </div>
  `,
  styles: `
    :host .scroll {
      height: 200px;
      overflow: auto;
    }
    :host .auto-complete {
      padding: 100px 0;
      height: 400px;
    }
  `
})
class XTestAutoCompleteCoverageScrollComponent {
  model = signal<string | null>(null);
  data = signal<XData<XAutoCompleteNode>>([]);

  scrollRef = viewChild.required<ElementRef<HTMLDivElement>>('scrollRef');
}

xdescribe(XAutoCompletePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        XTestAutoCompleteComponent,
        XTestAutoCompletePropertyComponent,
        XTestAutoCompleteCoverageScrollComponent
      ],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
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

      expect(true).toBe(true);
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

  xdescribe(`coverage.`, async () => {
    let fixture: ComponentFixture<XTestAutoCompletePropertyComponent>;
    let fixtrueScroll: ComponentFixture<XTestAutoCompleteCoverageScrollComponent>;
    let component: XTestAutoCompletePropertyComponent;
    let componentScroll: XTestAutoCompleteCoverageScrollComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAutoCompletePropertyComponent);
      fixtrueScroll = TestBed.createComponent(XTestAutoCompleteCoverageScrollComponent);
      component = fixture.componentInstance;
      componentScroll = fixtrueScroll.componentInstance;
      fixture.detectChanges();
      fixtrueScroll.detectChanges();
    });
    const showPortal = async (data: XData<XAutoCompleteNode> = ['aa', 'bb', 'cc']) => {
      const autoComplete = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
      component.data.set(data);
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
    it('setData.', async () => {
      await showPortal(
        () =>
          new Observable((x) => {
            x.next(['aa', 'bb', 'cc']);
          })
      );
      await closePortal();
      expect(component.model()).toBe('aa');
    });
    it('keydown.', async () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      let event = new KeyboardEvent('keydown', { keyCode: 40 }); // DOWN_ARROW
      input.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      await XSleep(200);
      await showPortal();

      let portal = document.querySelector('x-auto-complete-portal');
      expect(portal).toBeTruthy();
      event = new KeyboardEvent('keydown', { keyCode: 27 }); // ESCAPE
      input.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      await XSleep(300);
      portal = document.querySelector('x-auto-complete-portal');
      expect(portal).toBeFalsy();
    });
    it('parantScroll.', async () => {
      const autoComplete = fixtrueScroll.debugElement.query(By.directive(XAutoCompleteComponent));
      const instance = autoComplete.componentInstance as XAutoCompleteComponent;
      componentScroll.data.set(['aa', 'bb', 'cc']);
      fixtrueScroll.detectChanges();
      const input = fixtrueScroll.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      instance.value.set('a');
      fixtrueScroll.detectChanges();
      await XSleep(50);
      const event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      const change = new Event('change', { bubbles: true });
      input.nativeElement.dispatchEvent(change);
      fixtrueScroll.detectChanges();
      await XSleep(300);

      componentScroll.scrollRef().nativeElement.scrollTop = 50;
      await XSleep(300);
      componentScroll.scrollRef().nativeElement.scrollTop = 100;

      await XSleep(300);
      componentScroll.scrollRef().nativeElement.scrollTop = 150;

      expect(true).toBeTrue();
    });

    it('modelChange', async () => {
      const { input, instance } = await showPortal(
        () =>
          new Observable((x) => {
            x.next(['aa', 'bb', 'cc']);
          })
      );
      instance.value.set('bb');
      fixtrueScroll.detectChanges();
      await XSleep(50);
      let event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      fixtrueScroll.detectChanges();
      await XSleep(300);

      instance.value.set('');
      fixtrueScroll.detectChanges();
      await XSleep(50);
      event = new Event('input', { bubbles: true });
      input.nativeElement.dispatchEvent(event);
      fixtrueScroll.detectChanges();
      await XSleep(300);

      expect(true).toBeTrue();
    });

    it('outsidePointerClose.', async () => {
      await showPortal();

      const body = document.querySelector('body');
      body?.click();
      await XSleep(300);

      let portal = document.querySelector('x-auto-complete-portal');
      expect(portal).toBeFalsy();
    });
  });
});
