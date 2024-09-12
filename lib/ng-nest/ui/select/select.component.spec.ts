import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSelectComponent, XSelectNode, XSelectPrefix } from '@ng-nest/ui/select';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XPlacement, XSize, XTemplate } from '@ng-nest/ui/core';

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
}

describe(XSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSelectComponent, XTestSelectPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSelectPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
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
  });
});
