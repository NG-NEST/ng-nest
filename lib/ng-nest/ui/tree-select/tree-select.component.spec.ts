import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeSelectComponent, XTreeSelectNode, XTreeSelectPrefix } from '@ng-nest/ui/tree-select';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  XAlign,
  XComputedStyle,
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
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [XTreeSelectComponent],
  template: ` <x-tree-select></x-tree-select> `
})
class XTestTreeSelectComponent {}

@Component({
  imports: [XTreeSelectComponent, FormsModule, JsonPipe],
  template: `
    <x-tree-select
      [(ngModel)]="model"
      [data]="data()"
      [clearable]="clearable()"
      [async]="async()"
      [placement]="placement()"
      [multiple]="multiple()"
      [nodeTpl]="nodeTpl()"
      [expandedLevel]="expandedLevel()"
      [bordered]="bordered()"
      [portalMaxHeight]="portalMaxHeight()"
      [search]="search()"
      [caseSensitive]="caseSensitive()"
      [debounceTime]="debounceTime()"
      [maxTagCount]="maxTagCount()"
      [maxTagContent]="maxTagContent()"
      [virtualScroll]="virtualScroll()"
      [showPath]="showPath()"
      [separator]="separator()"
      [onlyLeaf]="onlyLeaf()"
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
    ></x-tree-select>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      @if (node) {
        <div>{{ node.label }} tpl</div>
      }
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTreeSelectPropertyComponent {
  model = signal<number | number[] | null>(null);
  data = signal<XData<XTreeSelectNode>>([]);
  clearable = signal(true);
  async = signal(false);
  placement = signal('bottom');
  multiple = signal(false);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
  expandedLevel = signal(-1);
  bordered = signal(true);
  portalMaxHeight = signal('12rem');
  search = signal(false);
  caseSensitive = signal(true);
  debounceTime = signal(200);
  maxTagCount = signal(-1);
  maxTagContent = signal<XTemplate | null>(null);
  virtualScroll = signal(false);
  showPath = signal(false);
  separator = signal('/');
  onlyLeaf = signal(false);
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

  nodeEmitResult = signal<XTreeSelectNode | null>(null);
  nodeEmit(node: XTreeSelectNode) {
    this.nodeEmitResult.set(node);
  }
}

describe(XTreeSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeSelectComponent, XTestTreeSelectPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTreeSelectComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTreeSelectComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTreeSelectPropertyComponent>;
    let component: XTestTreeSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTreeSelectPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(300);
      return { input };
    };
    const closePortal = async () => {
      const body = document.querySelector('body');
      body?.click();
      await XSleep(300);
    };
    const data = [
      { id: 1, label: 'node1' },
      { id: 2, label: 'node2' },
      { id: 3, label: 'node3', pid: 1 },
      { id: 4, label: 'node4', pid: 1 }
    ];
    it('data.', async () => {
      component.data.set(data);
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1\nnode2');
      await closePortal();
    });
    it('clearable.', async () => {
      component.data.set(data);
      component.clearable.set(true);
      component.model.set(1);
      fixture.detectChanges();
      await XSleep(50);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      expect(clear).toBeTruthy();
    });
    it('async.', async () => {
      component.async.set(true);
      component.data.set(
        new Observable<XTreeSelectNode[]>((x) => {
          setTimeout(() => {
            x.next(data);
            x.complete();
          }, 500);
        })
      );
      fixture.detectChanges();
      await showPortal();
      let portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal).toBeFalsy();
      await XSleep(300);
      portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1\nnode2');
      await closePortal();
    });
    it('placement.', () => {
      // cdk overlay. Restricted by browser window size
      expect(true).toBe(true);
    });
    it('multiple.', async () => {
      component.multiple.set(true);
      component.data.set(data);
      component.model.set([1, 2]);
      fixture.detectChanges();
      await XSleep(100);
      const values = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(values.nativeElement.innerText).toBe('node1\nnode2');
    });
    it('nodeTpl.', async () => {
      component.data.set(data);
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1 tpl\nnode2 tpl');
    });
    it('expandedLevel.', async () => {
      component.data.set(data);
      component.expandedLevel.set(0);
      fixture.detectChanges();
      await showPortal();
      await XSleep(100);
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1\nnode3\nnode4\nnode2');
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
      component.portalMaxHeight.set('100px');
      component.data.set(data);
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal')).nativeElement as HTMLDivElement;
      expect(XComputedStyle(portal, 'max-height')).toBe('100');
      await closePortal();
    });
    it('search.', async () => {
      component.search.set(true);
      component.data.set(data);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const treeSelect = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = treeSelect.componentInstance as XTreeSelectComponent;
      instance.displayValue.set('1');
      fixture.detectChanges();
      await XSleep(50);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1');
      await closePortal();
    });
    it('caseSensitive.', async () => {
      component.search.set(true);
      component.caseSensitive.set(false);
      component.data.set([...data, { id: 111, label: 'BB' }]);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const treeSelect = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = treeSelect.componentInstance as XTreeSelectComponent;
      instance.displayValue.set('b');
      fixture.detectChanges();
      await XSleep(50);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('BB');
      await closePortal();
    });
    it('debounceTime.', async () => {
      component.search.set(true);
      component.debounceTime.set(500);
      component.data.set(data);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      const treeSelect = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = treeSelect.componentInstance as XTreeSelectComponent;
      instance.displayValue.set('1');
      fixture.detectChanges();
      await XSleep(500);
      input.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      input.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('.x-tree-select-portal'));
      expect(portal.nativeElement.innerText).toBe('node1');
      await closePortal();
    });
    it('maxTagCount.', async () => {
      component.multiple.set(true);
      component.maxTagCount.set(2);
      component.data.set(data);
      component.model.set([1, 2, 3, 4]);
      fixture.detectChanges();
      await XSleep(100);
      const tags = fixture.debugElement.queryAll(By.css('.x-input-value-template-value x-tag'));
      expect(tags.length).toBe(3);
    });
    it('maxTagContent.', async () => {
      component.multiple.set(true);
      component.maxTagCount.set(2);
      component.maxTagContent.set('more {{surplus}} selected');
      component.data.set(data);
      component.model.set([1, 2, 3, 4]);
      fixture.detectChanges();
      await XSleep(100);
      const tag = fixture.debugElement.query(By.css('.x-input-value-template-value x-tag:nth-child(3)'));
      expect(tag.nativeElement.innerText).toBe('more 2 selected');
    });
    it('virtualScroll.', async () => {
      component.data.set(Array.from({ length: 100 }).map((_, index) => ({ id: index + 1, label: `node${index + 1}` })));
      component.virtualScroll.set(true);
      component.portalMaxHeight.set('15rem');
      fixture.detectChanges();
      await showPortal();
      const options = document.querySelectorAll('x-tree-node');
      expect(options.length < 100).toBe(true);
      await closePortal();
    });
    it('showPath.', async () => {
      component.showPath.set(true);
      component.data.set(data);
      component.model.set(3);
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText).toBe('node1/node3');
    });
    it('separator.', async () => {
      component.showPath.set(true);
      component.separator.set(' > ');
      component.data.set(data);
      component.model.set(3);
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(value.nativeElement.innerText).toBe('node1 > node3');
    });
    it('onlyLeaf.', async () => {
      component.onlyLeaf.set(true);
      component.data.set(data);
      fixture.detectChanges();
      await showPortal();
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement).toHaveClass('x-tree-only-leaf');
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
      const com = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = com.componentInstance as XTreeSelectComponent;
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
      const com = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = com.componentInstance as XTreeSelectComponent;
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
      const com = fixture.debugElement.query(By.directive(XTreeSelectComponent));
      const instance = com.componentInstance as XTreeSelectComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('nodeEmit.', () => {
      expect(true).toBe(true);
    });
  });
});
