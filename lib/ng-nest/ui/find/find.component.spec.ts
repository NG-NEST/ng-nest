import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFindComponent, XFindPrefix, XFindSearchOption } from '@ng-nest/ui/find';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { XAlign, XData, XDirection, XFilter, XJustify, XQuery, XSize, XSleep, XSort } from '@ng-nest/ui/core';
import { XTreeNode } from '@ng-nest/ui/tree';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  standalone: true,
  imports: [XFindComponent],
  template: ` <x-find></x-find> `
})
class XTestFindComponent {}

@Component({
  standalone: true,
  imports: [FormsModule, XFindComponent],
  template: `
    <x-find
      [(ngModel)]="model"
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
      [tableScroll]="tableScroll()"
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
    this.tableRowEmitResult.set(row);
  }

  tableCheckedRow = signal<{ [property: string]: any[] }>({});

  tableLoading = signal(false);
  tableVirtualScroll = signal(false);
  tableScroll = signal<{ x: number; y: number } | null>(null);
  tableBodyHeight = signal<number | null>(null);
  tableMinBufferPx = signal(100);
  tableMaxBufferPx = signal(200);
  tableAdaptionHeight = signal<number | null>(null);
  tableDocPercent = signal(1);
  tableRowHeight = signal(42);
  treeData = signal<XData<XTreeNode>>([]);
  treeActivatedId = signal<any>(null);
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

  model = signal<any>(null);
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
    const showPortal = async () => {
      component.dialogVisible.set(true);
      fixture.detectChanges();
      await XSleep(300);
    };
    const closePortal = async () => {
      component.dialogVisible.set(false);
      fixture.detectChanges();
      await XSleep(300);
    };
    it('bordered.', () => {
      component.bordered.set(false);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.x-find .x-button'));
      expect(button.nativeElement).toHaveClass('x-button-only-icon');
      component.tableData.set([
        { id: 1, label: 'test1' },
        { id: 2, label: 'test2' },
        { id: 3, label: 'test3' }
      ]);
      component.model.set({ id: 1, label: 'test1' });
      fixture.detectChanges();
      const tags = fixture.debugElement.queryAll(By.css('.x-find .x-tag'));
      for (let tag of tags) {
        expect(tag.nativeElement).not.toHaveClass('x-tag-bordered');
      }
    });
    it('multiple.', async () => {
      component.multiple.set(true);
      component.tableData.set([
        { id: 1, label: 'test1' },
        { id: 2, label: 'test2' },
        { id: 3, label: 'test3' }
      ]);
      component.model.set([
        { id: 1, label: 'test1' },
        { id: 2, label: 'test2' }
      ]);
      fixture.detectChanges();
      await XSleep(100);
      const tags = fixture.debugElement.queryAll(By.css('.x-find .x-tag'));
      expect(tags.length).toBe(2);
    });
    it('columnLabel.', async () => {
      component.columnLabel.set('name');
      component.tableData.set([
        { id: 1, label: 'test1', name: 'name1' },
        { id: 2, label: 'test2', name: 'name2' },
        { id: 3, label: 'test3', name: 'name3' }
      ]);
      component.model.set({ id: 1, label: 'test1', name: 'name1' });
      fixture.detectChanges();
      await XSleep(0);
      const tag = fixture.debugElement.query(By.css('.x-find .x-tag'));
      expect(tag.nativeElement.innerText).toBe('name1');
    });
    it('dialogTitle.', async () => {
      component.dialogTitle.set('title');
      await showPortal();
      const title = fixture.debugElement.query(By.css('.x-alert-title'));
      expect(title.nativeElement.innerText).toBe('title');
      await closePortal();
    });
    it('dialogCheckboxLabel.', async () => {
      component.dialogCheckboxLabel.set('checked');
      component.multiple.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      await showPortal();
      const th = fixture.debugElement.query(By.css('.x-table thead th:nth-child(1)'));
      expect(th.nativeElement.innerText).toBe('checked');
      await closePortal();
    });
    it('dialogCheckboxWidth.', async () => {
      component.dialogCheckboxWidth.set('100px');
      component.multiple.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      await showPortal();
      const th = fixture.debugElement.query(By.css('.x-table thead th:nth-child(1)'));
      expect(th.nativeElement.clientWidth).toBe(100);
      await closePortal();
    });
    it('dialogEmptyContent.', async () => {
      component.multiple.set(true);
      component.dialogEmptyContent.set('empty text');
      await showPortal();
      const empty = fixture.debugElement.query(By.css('x-empty'));
      expect(empty.nativeElement.innerText).toBe('empty text');
      await closePortal();
    });
    it('dialogWidth.', async () => {
      component.dialogWidth.set('300px');
      fixture.detectChanges();
      await showPortal();

      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay.clientWidth).toBe(300);
      await closePortal();
    });
    it('dialogHeight.', async () => {
      component.dialogHeight.set('300px');
      fixture.detectChanges();
      await showPortal();

      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay.clientHeight).toBe(300);
      await closePortal();
    });
    it('dialogVisible.', async () => {
      await showPortal();
      let dialog = fixture.debugElement.query(By.css('.x-dialog'));
      expect(dialog).toBeTruthy();

      await closePortal();
      dialog = fixture.debugElement.query(By.css('.x-dialog'));
      expect(dialog).not.toBeTruthy();
    });
    it('dialogButtonsCenter.', async () => {
      component.dialogButtonsCenter.set(true);
      fixture.detectChanges();
      await showPortal();
      const buttons = fixture.debugElement.query(By.css('.x-dialog-buttons'));
      expect(buttons.nativeElement).toHaveClass('x-dialog-buttons-center');
      await closePortal();
    });
    it('tableData.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      await showPortal();
      const body = fixture.debugElement.query(By.css('.x-table tbody'));
      expect(body.nativeElement.innerText).toBe('aa\nbb');
      await closePortal();
    });
    it('tableIndex.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableIndex.set(2);
      component.tableTotal.set(30);
      await showPortal();
      const btn = fixture.debugElement.query(By.css('.x-pagination x-buttons x-button:nth-child(4) .x-button'));
      expect(btn.nativeElement).toHaveClass('x-button-activated');
      expect(btn.nativeElement.innerText).toBe('2');
      await closePortal();
    });
    it('tableSize.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableSize.set(20);
      component.tableTotal.set(30);
      await showPortal();
      const buttons = fixture.debugElement.query(By.css('.x-pagination x-buttons'));
      expect(buttons.nativeElement.innerText).toBe('1\n2');
      await closePortal();
    });
    it('tableQuery.', async () => {
      let query: XQuery = {};
      component.tableColumns.set([{ id: 'label', label: 'label', sort: true }]);
      component.tableData.set((_index: number, _size: number, _query: XQuery) => {
        return new Observable((x) => {
          query = _query;
          x.next({
            total: 100,
            list: [
              { id: 'aa', label: 'aa' },
              { id: 'bb', label: 'bb' }
            ]
          });
          x.complete();
        });
      });
      await showPortal();
      const thSort = fixture.debugElement.query(By.css('.x-table-sort'));
      thSort.nativeElement.click();
      fixture.detectChanges();
      expect(query.sort![0].field).toBe('label');
      expect(query.sort![0].value).toBe('desc');
      await closePortal();
    });
    it('tableTotal.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableTotal.set(30);
      await showPortal();
      const buttons = fixture.debugElement.query(By.css('.x-pagination x-buttons'));
      expect(buttons.nativeElement.innerText).toBe('1\n2\n3');
      const total = fixture.debugElement.query(By.css('.x-pagination-total'));
      expect(total.nativeElement.innerText.replace(/[^\d]/g, '')).toBe('30');
      await closePortal();
    });
    it('tableSortChange.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label', sort: true }]);
      component.tableData.set((_index: number, _size: number, _query: XQuery) => {
        return new Observable((x) => {
          x.next({
            total: 100,
            list: [
              { id: 'aa', label: 'aa' },
              { id: 'bb', label: 'bb' }
            ]
          });
          x.complete();
        });
      });
      await showPortal();
      const thSort = fixture.debugElement.query(By.css('.x-table-sort'));
      thSort.nativeElement.click();
      fixture.detectChanges();
      expect(component.tableSortChangeResult()![0].field).toBe('label');
      expect(component.tableSortChangeResult()![0].value).toBe('desc');
      await closePortal();
    });
    it('tableColumns.', async () => {
      component.tableColumns.set([
        { id: 'id', label: 'id' },
        { id: 'label', label: 'label' }
      ]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      await showPortal();
      const thead = fixture.debugElement.query(By.css('.x-table thead'));
      expect(thead.nativeElement.innerText).toBe('id\nlabel');
      await closePortal();
    });
    it('tableActivatedRow.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableActivatedRow.set({ id: 'aa', label: 'aa' });
      await showPortal();
      const activated = fixture.debugElement.query(By.css('.x-table-activated'));
      expect(activated.nativeElement.innerText).toBe('aa');
      await closePortal();
    });
    it('tableRowEmit.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.multiple.set(true);
      await showPortal();
      const tr = fixture.debugElement.query(By.css('.x-table tbody tr'));
      tr.nativeElement.click();
      fixture.detectChanges();
      expect(component.tableRowEmitResult().id).toBe('aa');
      await closePortal();
    });
    it('tableCheckedRow.', async () => {
      component.tableColumns.set([
        { id: 'id', label: 'id', type: 'checkbox' },
        { id: 'label', label: 'label' }
      ]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableCheckedRow.set({ id: ['aa', 'bb'] });
      await showPortal();
      const checkedItems = fixture.debugElement.queryAll(By.css('.x-checkbox-row-item'));
      for (let item of checkedItems) {
        expect(item.nativeElement).toHaveClass('x-checked');
      }
      await closePortal();
    });
    it('tableLoading.', async () => {
      component.tableLoading.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set((_index: number, _size: number, _query: XQuery) => {
        return new Observable((x) => {
          setTimeout(() => {
            x.next({
              total: 100,
              list: [
                { id: 'aa', label: 'aa' },
                { id: 'bb', label: 'bb' }
              ]
            });
            x.complete();
          }, 1000);
        });
      });
      await showPortal();
      let loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading).toBeTruthy();
      await XSleep(1000);
      loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading).toBeFalsy();
      await closePortal();
    });
    it('tableVirtualScroll.', async () => {
      component.tableRowHeight.set(0);
      component.tableScroll.set({ x: 300, y: 300 });
      component.tableVirtualScroll.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableSize.set(1000);
      component.tableData.set(Array.from({ length: 1000 }).map((_, i) => ({ id: i + 1, label: `label${i + 1}` })));
      fixture.detectChanges();
      await showPortal();
      const trlist = fixture.debugElement.queryAll(By.css('cdk-virtual-scroll-viewport tr'));
      expect(trlist.length).toBeLessThan(1000);
      await closePortal();
    });
    it('tableBodyHeight.', async () => {
      component.tableVirtualScroll.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableSize.set(1000);
      component.tableData.set(Array.from({ length: 1000 }).map((_, i) => ({ id: i + 1, label: `label${i + 1}` })));
      component.tableBodyHeight.set(200);
      await showPortal();
      const tbody = fixture.debugElement.query(By.css('.x-table tbody'));
      expect(tbody.nativeElement.clientHeight).toBe(200);
      await closePortal();
    });
    it('tableMinBufferPx.', () => {
      // cdk scroll minBufferPx
      expect(true).toBe(true);
    });
    it('tableMaxBufferPx.', () => {
      // cdk scroll maxBufferPx
      expect(true).toBe(true);
    });
    it('tableAdaptionHeight.', async () => {
      component.tableVirtualScroll.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableSize.set(1000);
      component.tableData.set(Array.from({ length: 1000 }).map((_, i) => ({ id: i + 1, label: `label${i + 1}` })));
      component.tableBodyHeight.set(420);
      component.tableAdaptionHeight.set(126);
      component.tableDocPercent.set(0.8);
      component.dialogHeight.set('80%');
      await showPortal();
      const tbody = fixture.debugElement.query(By.css('.x-table tbody'));
      const thead = fixture.debugElement.query(By.css('.x-table thead'));
      const pagination = fixture.debugElement.query(By.css('x-pagination'));
      const bodyHeight = document.documentElement.clientHeight;
      const diff =
        bodyHeight * 0.8 -
        126 -
        thead.nativeElement.clientHeight -
        pagination.nativeElement.clientHeight -
        tbody.nativeElement.clientHeight;
      expect(diff >= -1 && diff <= 1).toBe(true);
    });
    it('tableDocPercent.', async () => {
      component.tableVirtualScroll.set(true);
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableSize.set(1000);
      component.tableData.set(Array.from({ length: 1000 }).map((_, i) => ({ id: i + 1, label: `label${i + 1}` })));
      component.tableBodyHeight.set(420);
      component.tableAdaptionHeight.set(126);
      component.tableDocPercent.set(0.7);
      component.dialogHeight.set('70%');
      await showPortal();
      const tbody = fixture.debugElement.query(By.css('.x-table tbody'));
      const thead = fixture.debugElement.query(By.css('.x-table thead'));
      const pagination = fixture.debugElement.query(By.css('x-pagination'));
      const bodyHeight = document.documentElement.clientHeight;
      const diff =
        bodyHeight * 0.7 -
        126 -
        thead.nativeElement.clientHeight -
        pagination.nativeElement.clientHeight -
        tbody.nativeElement.clientHeight;
      expect(diff >= -1 && diff <= 1).toBe(true);
      await closePortal();
    });
    it('tableRowHeight.', async () => {
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' }
      ]);
      component.tableRowHeight.set(50);
      await showPortal();
      const tr = fixture.debugElement.query(By.css('.x-table tbody tr'));
      expect(tr.nativeElement.clientHeight).toBe(50);
      await closePortal();
    });
    it('treeData.', async () => {
      component.treeData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc', pid: 'bb' }
      ]);

      await showPortal();
      const tree = fixture.debugElement.query(By.css('x-tree'));
      expect(tree.nativeElement.innerText).toBe('aa\nbb\ncc');
      await closePortal();
    });
    it('treeActivatedId.', async () => {
      component.treeData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc', pid: 'bb' }
      ]);
      component.treeActivatedId.set('aa');
      await showPortal();
      const node = fixture.debugElement.query(By.css('x-tree-node .x-activated'));
      expect(node.nativeElement.innerText).toBe('aa');
      await closePortal();
    });
    it('treeExpandedLevel.', async () => {
      component.treeExpandedLevel.set(2);
      component.treeData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc', pid: 'bb' },
        { id: 'dd', label: 'dd', pid: 'cc' }
      ]);
      await showPortal();
      const tree = fixture.debugElement.query(By.css('x-tree'));
      expect(tree.nativeElement.innerText).toBe('aa\nbb\ncc\ndd');
      await closePortal();
    });
    it('treeChecked.', async () => {
      component.treeData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc', pid: 'bb' }
      ]);
      component.treeCheckbox.set(true);
      component.treeChecked.set(['aa']);
      fixture.detectChanges();
      await showPortal();
      const node = fixture.debugElement.query(By.css('x-tree-node'));
      const checkbox = node.nativeElement.querySelector('.x-checkbox-row-item');
      expect(checkbox).toHaveClass('x-checked');
      expect(node.nativeElement.innerText).toBe('aa');
      await closePortal();
    });
    it('treeCheckbox.', async () => {
      component.treeData.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc', pid: 'bb' }
      ]);
      component.treeCheckbox.set(true);
      fixture.detectChanges();
      await showPortal();
      const checkbox = fixture.debugElement.query(By.css('x-checkbox'));
      expect(checkbox).toBeTruthy();
      await closePortal();
    });
    it('treeTableConnect.', async () => {
      component.treeData.set([
        { id: 'node1', label: 'node1' },
        { id: 'node2', label: 'node2' },
        { id: 'node3', label: 'node3', pid: 'node2' }
      ]);
      component.tableColumns.set([
        { id: 'label', label: 'label' },
        { id: 'treeId', label: 'treeId' }
      ]);
      component.tableData.set((_index: number, _size: number, query: XQuery) => {
        return new Observable((x) => {
          let data: any[] = [
            { id: 'aa', label: 'aa', treeId: 'node1' },
            { id: 'bb', label: 'bb', treeId: 'node2' },
            { id: 'cc', label: 'cc', treeId: 'node3' }
          ];
          if (query.filter && query.filter.length > 0) {
            let filter = query.filter[0] as XFilter;
            data = data.filter((x) => x[`${filter.field}`] === filter.value);
          }
          x.next({
            total: 100,
            list: data
          });
          x.complete();
        });
      });
      component.treeTableConnect.set('treeId');
      await showPortal();
      const node = fixture.debugElement.query(By.css('.x-tree-node-content'));
      node.nativeElement.click();
      fixture.detectChanges();
      let tbody = fixture.debugElement.query(By.css('.x-table tbody'));
      expect(tbody.nativeElement.innerText).toBe('aa\nnode1');
      await closePortal();
    });
    it('search.', async () => {
      component.search.set({ label: '标签', button: '查询', field: 'label' });
      component.tableColumns.set([{ id: 'label', label: 'label' }]);
      component.tableData.set((_index: number, _size: number, query: XQuery) => {
        return new Observable((x) => {
          let data: any[] = [
            { id: 'aa', label: 'aa' },
            { id: 'bb', label: 'bb' }
          ];
          if (query && query.filter && query.filter.length > 0) {
            const filter = query.filter[0];
            data = data.filter((x) => x[`${filter.field}`] === filter.value);
          }
          x.next({
            total: 100,
            list: data
          });
          x.complete();
        });
      });
      await showPortal();
      const input = fixture.debugElement.query(By.directive(XInputComponent)).componentInstance as XInputComponent;
      input.value.set('aa');
      input.onChange('aa');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('.x-find-search x-button'));
      btn.nativeElement.click();
      fixture.detectChanges();
      let tbody = fixture.debugElement.query(By.css('.x-table tbody'));
      expect(tbody.nativeElement.innerText).toBe('aa');
      await closePortal();
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
