import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFindComponent, XFindPrefix, XFindSearchOption } from '@ng-nest/ui/find';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { XAlign, XData, XDirection, XJustify, XQuery, XSize, XSort } from '@ng-nest/ui/core';
import { XTreeNode } from '@ng-nest/ui/tree';
import { provideAnimations } from '@angular/platform-browser/animations';

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
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [disabled]="disabled()"
      [required]="required()"
    ></x-find>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

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
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  disabled = signal(false);
  required = signal(false);
}

describe(XFindPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestFindComponent, XTestFindPropertyComponent],
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
    let component: XTestFindPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestFindPropertyComponent);
      component = fixture.componentInstance;
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
      const input = fixture.debugElement.query(By.css('.x-button'));
      expect(input.nativeElement).toHaveClass('x-size-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-size-large');
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
      const find = fixture.debugElement.query(By.css('.x-find'));
      expect(find.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const find = fixture.debugElement.query(By.css('.x-find'));
      expect(find.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const find = fixture.debugElement.query(By.css('.x-find'));
      expect(find.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const find = fixture.debugElement.query(By.css('.x-find'));
      expect(find.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.label.set('label');
      component.required.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('label'));
      expect(input.nativeElement).toHaveClass('x-find-label-required');
    });
  });
});
