import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFindComponent, XFindPrefix, XFindSearchOption } from '@ng-nest/ui/find';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { XAlign, XData, XDirection, XJustify, XQuery, XSize, XSort, XTemplate } from '@ng-nest/ui/core';
import { XTreeNode } from '@ng-nest/ui/tree';

@Component({
  standalone: true,
  imports: [XFindComponent],
  template: ` <x-find></x-find> `
})
class XTestFindComponent {}

@Component({
  standalone: true,
  imports: [XFindComponent],
  template: `
    <x-find
      [bordered]="bordered()"
      [multiple]="multiple()"
      [columnLabel]="columnLabel()"
      [dialogTitle]="dialogTitle()"
      [dialogCheckboxLabel]="dialogCheckboxLabel()"
      [dialogCheckboxWidth]="dialogCheckboxWidth()"
      [dialogEmptyContent]="dialogEmptyContent()"
      [dialogWidth]="dialogWidth()"
      [dialogHeight]="dialogHeight()"
      [dialogEmptyContent]="dialogEmptyContent()"
      [(dialogVisible)]="dialogVisible"
      [dialogButtonsCenter]="dialogButtonsCenter()"
      [tableData]="tableData()"
      [(tableIndex)]="tableIndex"
      [(tableSize)]="tableSize"
      [(tableQuery)]="tableQuery"
      [(tableTotal)]="tableTotal"
      (tableSortChange)="tableSortChange($event)"
      [tableColumns]="tableColumns()"
      [(tableActivatedRow)]="tableActivatedRow"
      (tableRowEmit)="tableRowEmit($event)"
      [(tableCheckedRow)]="tableCheckedRow"
      [tableLoading]="tableLoading()"
      [tableVirtualScroll]="tableVirtualScroll()"
      [tableBodyHeight]="tableBodyHeight()"
      [tableMinBufferPx]="tableMinBufferPx()"
      [tableMaxBufferPx]="tableMaxBufferPx()"
      [tableAdaptionHeight]="tableAdaptionHeight()"
      [tableDocPercent]="tableDocPercent()"
      [tableRowHeight]="tableRowHeight()"
      [treeData]="treeData()"
      [(treeActivatedId)]="treeActivatedId"
      [treeExpandedLevel]="treeExpandedLevel()"
      [(treeChecked)]="treeChecked"
      [treeCheckbox]="treeCheckbox()"
      [treeTableConnect]="treeTableConnect()"
      [search]="search()"
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
    ></x-find>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestFindPropertyComponent {
  bordered = signal(true);
  multiple = signal(false);
  columnLabel = signal('label');
  dialogTitle = signal('查找选择');
  dialogCheckboxLabel = signal('选择');
  dialogCheckboxWidth = signal('60px');
  dialogEmptyContent = signal('请选择数据');
  dialogWidth = signal('');
  dialogHeight = signal('');
  dialogVisible = signal(false);
  dialogButtonsCenter = signal(false);
  tableData = signal<XData<XTableRow>>([]);
  tableIndex = signal(1);
  tableSize = signal(10);
  tableQuery = signal<XQuery>({});
  tableTotal = signal(0);

  tableSortChangeResult = signal<XSort[] | null>(null);
  tableSortChange(sorts: XSort[]) {
    this.tableSortChangeResult.set(sorts);
  }

  tableColumns = signal<XTableColumn[]>([]);
  tableActivatedRow = signal<any>(null);

  tableRowEmitResult = signal<any>(null);
  tableRowEmit(row: any) {
    this.tableSortChangeResult.set(row);
  }

  tableCheckedRow = signal<{ [property: string]: any[] }>({});

  tableLoading = signal(false);
  tableVirtualScroll = signal(false);
  tableBodyHeight = signal<number | null>(null);
  tableMinBufferPx = signal(100);
  tableMaxBufferPx = signal(200);
  tableAdaptionHeight = signal<number | null>(null);
  tableDocPercent = signal(1);
  tableRowHeight = signal(42);
  treeData = signal<XData<XTreeNode>>([]);
  treeActivatedId = signal(null);
  treeExpandedLevel = signal(0);
  treeChecked = signal<any[]>([]);
  treeCheckbox = signal(false);
  treeTableConnect = signal('');
  search = signal<XFindSearchOption | null>(null);
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

describe(XFindPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestFindComponent, XTestFindPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestFindComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestFindComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XFindComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestFindPropertyComponent>;
    // let component: XTestFindPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestFindPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      expect(true).toBe(true);
    });
    it('columnLabel.', () => {
      expect(true).toBe(true);
    });
    it('dialogTitle.', () => {
      expect(true).toBe(true);
    });
    it('dialogCheckboxLabel.', () => {
      expect(true).toBe(true);
    });
    it('dialogCheckboxWidth.', () => {
      expect(true).toBe(true);
    });
    it('dialogEmptyContent.', () => {
      expect(true).toBe(true);
    });
    it('dialogWidth.', () => {
      expect(true).toBe(true);
    });
    it('dialogHeight.', () => {
      expect(true).toBe(true);
    });
    it('dialogVisible.', () => {
      expect(true).toBe(true);
    });
    it('dialogButtonsCenter.', () => {
      expect(true).toBe(true);
    });
    it('tableData.', () => {
      expect(true).toBe(true);
    });
    it('tableIndex.', () => {
      expect(true).toBe(true);
    });
    it('tableSize.', () => {
      expect(true).toBe(true);
    });
    it('tableQuery.', () => {
      expect(true).toBe(true);
    });
    it('tableTotal.', () => {
      expect(true).toBe(true);
    });
    it('tableSortChange.', () => {
      expect(true).toBe(true);
    });
    it('tableColumns.', () => {
      expect(true).toBe(true);
    });
    it('tableActivatedRow.', () => {
      expect(true).toBe(true);
    });
    it('tableRowEmit.', () => {
      expect(true).toBe(true);
    });
    it('tableCheckedRow.', () => {
      expect(true).toBe(true);
    });
    it('tableLoading.', () => {
      expect(true).toBe(true);
    });
    it('tableVirtualScroll.', () => {
      expect(true).toBe(true);
    });
    it('tableBodyHeight.', () => {
      expect(true).toBe(true);
    });
    it('tableMinBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('tableMaxBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('tableAdaptionHeight.', () => {
      expect(true).toBe(true);
    });
    it('tableDocPercent.', () => {
      expect(true).toBe(true);
    });
    it('tableRowHeight.', () => {
      expect(true).toBe(true);
    });
    it('treeData.', () => {
      expect(true).toBe(true);
    });
    it('treeActivatedId.', () => {
      expect(true).toBe(true);
    });
    it('treeExpandedLevel.', () => {
      expect(true).toBe(true);
    });
    it('treeChecked.', () => {
      expect(true).toBe(true);
    });
    it('treeCheckbox.', () => {
      expect(true).toBe(true);
    });
    it('treeTableConnect.', () => {
      expect(true).toBe(true);
    });
    it('search.', () => {
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
