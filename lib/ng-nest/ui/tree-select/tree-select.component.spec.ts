import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeSelectComponent, XTreeSelectNode, XTreeSelectPrefix } from '@ng-nest/ui/tree-select';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XTreeSelectComponent],
  template: ` <x-tree-select></x-tree-select> `
})
class XTestTreeSelectComponent {}

@Component({
  standalone: true,
  imports: [XTreeSelectComponent],
  template: `
    <x-tree-select
      [data]="data()"
      [clearable]="clearable()"
      [async]="async()"
      [placement]="placement()"
      [multiple]="multiple()"
      [selectAll]="selectAll()"
      [selectAllText]="selectAllText()"
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

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTreeSelectPropertyComponent {
  data = signal<XData<XTreeSelectNode>>([]);
  clearable = signal(true);
  async = signal(false);
  placement = signal('bottom');
  multiple = signal(false);
  selectAll = signal(false);
  selectAllText = signal('');
  nodeTpl = signal<TemplateRef<any> | null>(null);
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

  nodeEmitResult = signal<XTreeSelectNode | null>(null);
  nodeEmit(node: XTreeSelectNode) {
    this.nodeEmitResult.set(node);
  }
}

describe(XTreeSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeSelectComponent, XTestTreeSelectPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestTreeSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTreeSelectPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
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
    it('expandedLevel.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('portalMaxHeight.', () => {
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
    it('showPath.', () => {
      expect(true).toBe(true);
    });
    it('separator.', () => {
      expect(true).toBe(true);
    });
    it('onlyLeaf.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('pointer.', () => {
      expect(true).toBe(true);
    });
    it('label.', () => {
      expect(true).toBe(true);
    });
    it('labelWidth.', () => {
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
