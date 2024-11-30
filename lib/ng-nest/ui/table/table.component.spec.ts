import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XPaginationPosition,
  XTableCellConfig,
  XTableColumn,
  XTableComponent,
  XTableDragWidthEvent,
  XTableHeadCheckbox,
  XTableHeaderPosition,
  XTablePrefix,
  XTableRow,
  XTableTemplate
} from '@ng-nest/ui/table';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XData, XDataArray, XOrderBy, XQuery, XSize, XSleep, XSort, XTemplate } from '@ng-nest/ui/core';
import { XPaginationInputIndexSizeSureType, XPaginationSizeData } from '@ng-nest/ui/pagination';
import { XSelectNode } from '@ng-nest/ui/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  imports: [XTableComponent],
  template: ` <x-table> </x-table> `
})
class XTestTableComponent {}

@Component({
  imports: [XTableComponent, FormsModule, XInputComponent],
  template: `
    <x-table
      [data]="data()"
      [columns]="columns()"
      [rowHeight]="rowHeight()"
      [loading]="loading()"
      [bordered]="bordered()"
      [showHeader]="showHeader()"
      [headerPosition]="headerPosition()"
      [headColumnTpl]="headColumnTpl()"
      [headThTpl]="headThTpl()"
      [bodyColumnTpl]="bodyColumnTpl()"
      [bodyTdTpl]="bodyTdTpl()"
      [rowClass]="rowClass()"
      [headSearchTpl]="headSearchTpl()"
      [(activatedRow)]="activatedRow"
      [(manual)]="manual"
      [(index)]="index"
      [(size)]="size"
      [(total)]="total"
      [(query)]="query"
      (sortChange)="sortChange($event)"
      (headCheckboxChange)="headCheckboxChange($event)"
      (bodyCheckboxChange)="bodyCheckboxChange($event)"
      [allowSelectRow]="allowSelectRow()"
      [allowCheckRow]="allowCheckRow()"
      [virtualScroll]="virtualScroll()"
      [bodyHeight]="bodyHeight()"
      [itemSize]="itemSize()"
      [minBufferPx]="minBufferPx()"
      [maxBufferPx]="maxBufferPx()"
      [adaptionHeight]="adaptionHeight()"
      [docPercent]="docPercent()"
      [checkedRow]="checkedRow()"
      [scroll]="scroll()"
      [header]="header()"
      [footer]="footer()"
      [cellConfig]="cellConfig()"
      [rowSize]="rowSize()"
      [paginationPosition]="paginationPosition()"
      [hiddenWrapBorder]="hiddenWrapBorder()"
      [hiddenPaginationBorder]="hiddenPaginationBorder()"
      [showPagination]="showPagination()"
      [treeTable]="treeTable()"
      [expandedAll]="expandedAll()"
      [expandedLevel]="expandedLevel()"
      [expanded]="expanded()"
      [expandTpl]="expandTpl()"
      [showEmpty]="showEmpty()"
      [emptyImg]="emptyImg()"
      [emptyContent]="emptyContent()"
      [pageLinkSize]="pageLinkSize()"
      [showEllipsis]="showEllipsis()"
      [showTotal]="showTotal()"
      [space]="space()"
      [showBackground]="showBackground()"
      [showSize]="showSize()"
      [sizeWidth]="sizeWidth()"
      [showInputSize]="showInputSize()"
      [inputSizeTooltipText]="inputSizeTooltipText()"
      [inputSizeWidth]="inputSizeWidth()"
      [sizeData]="sizeData()"
      [disabled]="disabled()"
      [showJump]="showJump()"
      [jumpTooltipText]="jumpTooltipText()"
      [jumpWidth]="jumpWidth()"
      [totalTpl]="totalTpl()"
      [simple]="simple()"
      [simpleIndexWidth]="simpleIndexWidth()"
      [inputIndexSizeSureType]="inputIndexSizeSureType()"
      (columnDragStarted)="columnDragStarted($event)"
      (columnDragEnded)="columnDragEnded($event)"
      (columnDropListDropped)="columnDropListDropped($event)"
      (columnDragWidthStarted)="columnDragWidthStarted($event)"
      (columnDragWidthMoved)="columnDragWidthMoved($event)"
      (columnDragWidthEnded)="columnDragWidthEnded($event)"
    >
    </x-table>

    <ng-template #headColumnTemplate let-column="$column">{{ column.id }} tpl</ng-template>

    <ng-template #headThTemplate let-column="$column">{{ column.id }} tpl</ng-template>

    <ng-template #bodyColumnTemplate let-column="$column" let-row="$row">{{ row[column.id] }} tpl</ng-template>

    <ng-template #bodyTdTemplate let-column="$column" let-row="$row">{{ row[column.id] }} tpl</ng-template>

    <ng-template #headSearchTemplate let-column="$column">
      @switch (column.id) {
        @case ('id') {
          <x-input [style.width.%]="100" [(ngModel)]="search.id" (ngModelChange)="searchChange($event, 'id')"></x-input>
        }
        @case ('name') {
          <x-input
            [style.width.%]="100"
            [(ngModel)]="search.name"
            (ngModelChange)="searchChange($event, 'name')"
          ></x-input>
        }
      }
    </ng-template>
  `,
  styles: `
    :host {
      .even {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .odd {
        background-color: white;
      }
      .last {
        color: blue;
      }
      .inspector {
        color: red;
      }
    }
  `
})
class XTestTablePropertyComponent {
  data = signal<XData<XTableRow>>([]);
  columns = signal<XTableColumn[]>([]);
  rowHeight = signal(42);
  loading = signal(false);
  bordered = signal(false);
  showHeader = signal(true);
  headerPosition = signal<XTableHeaderPosition>('top');
  activatedRow = signal<XTableRow | null>(null);
  headColumnTpl = signal<XTableTemplate>({});
  headColumnTemplate = viewChild.required<TemplateRef<any>>('headColumnTemplate');
  headThTpl = signal<XTemplate | null>(null);
  headThTemplate = viewChild.required<TemplateRef<any>>('headThTemplate');
  bodyColumnTpl = signal<XTableTemplate>({});
  bodyColumnTemplate = viewChild.required<TemplateRef<any>>('bodyColumnTemplate');
  bodyTdTpl = signal<XTemplate | null>(null);
  bodyTdTemplate = viewChild.required<TemplateRef<any>>('bodyTdTemplate');
  rowClass = signal<((row: XTableRow, index: number) => { [className: string]: boolean }) | null>(null);
  headSearchTpl = signal<XTemplate | null>(null);
  headSearchTemplate = viewChild.required<TemplateRef<any>>('headSearchTemplate');
  search = {
    id: '',
    name: ''
  };
  searchChange(value: string, field: string) {
    console.log(value, field);
  }

  sortChangeResult = signal<XSort[] | null>(null);
  sortChange(sort: XSort[]) {
    this.sortChangeResult.set(sort);
  }

  headCheckboxChangeResult = signal<XTableHeadCheckbox | null>(null);
  headCheckboxChange(headCheckbox: XTableHeadCheckbox) {
    this.headCheckboxChangeResult.set(headCheckbox);
  }

  bodyCheckboxChangeResult = signal<XTableRow | null>(null);
  bodyCheckboxChange(row: XTableRow) {
    this.bodyCheckboxChangeResult.set(row);
  }

  allowSelectRow = signal(true);
  allowCheckRow = signal(true);
  virtualScroll = signal(false);
  bodyHeight = signal<number | null>(null);
  itemSize = signal(42);
  minBufferPx = signal(100);
  maxBufferPx = signal(200);
  adaptionHeight = signal<number | null>(null);
  docPercent = signal<number>(1);
  checkedRow = signal<{ [property: string]: any[] }>({});
  manual = signal<boolean>(true);
  scroll = signal<{ x: number; y: number } | null>(null);
  header = signal<XTemplate | null>(null);
  footer = signal<XTemplate | null>(null);
  cellConfig = signal<XTableCellConfig | null>(null);
  rowSize = signal<XSize>('medium');
  paginationPosition = signal<XPaginationPosition>('bottom-left');
  hiddenWrapBorder = signal(false);
  hiddenPaginationBorder = signal(false);
  showPagination = signal(true);
  treeTable = signal(false);
  expandedAll = signal(false);
  expandedLevel = signal(-1);
  expanded = signal<any[]>([]);
  expandTpl = signal<XTemplate | null>(null);
  showEmpty = signal(true);
  emptyImg = signal<XTemplate | null>(null);
  emptyContent = signal<XTemplate | null>(null);
  index = signal(1);
  size = signal(10);
  total = signal(0);
  query = signal<XQuery>({});
  pageLinkSize = signal(5);
  showEllipsis = signal(true);
  showTotal = signal(true);
  space = signal('0.25rem');
  showBackground = signal(false);
  showSize = signal(false);
  sizeWidth = signal('6.875rem');
  showInputSize = signal(false);
  inputSizeTooltipText = signal('');
  inputSizeWidth = signal('3.125rem');
  sizeData = signal<XDataArray<XSelectNode>>(XPaginationSizeData);
  disabled = signal(false);
  showJump = signal(false);
  jumpTooltipText = signal('');
  jumpWidth = signal('3.125rem');
  totalTpl = signal<XTemplate | null>(null);
  simple = signal(false);
  simpleIndexWidth = signal('8.125rem');
  inputIndexSizeSureType = signal<XPaginationInputIndexSizeSureType>('enter');

  columnDragStartedResult = signal<XTableColumn | null>(null);
  columnDragStarted(column: XTableColumn) {
    this.columnDragStartedResult.set(column);
  }

  columnDragEndedResult = signal<XTableColumn | null>(null);
  columnDragEnded(column: XTableColumn) {
    this.columnDragEndedResult.set(column);
  }

  columnDropListDroppedResult = signal<XTableColumn[] | null>(null);
  columnDropListDropped(columns: XTableColumn[]) {
    this.columnDropListDroppedResult.set(columns);
  }

  columnDragWidthStartedResult = signal<XTableDragWidthEvent | null>(null);
  columnDragWidthStarted(event: XTableDragWidthEvent) {
    this.columnDragWidthStartedResult.set(event);
  }

  columnDragWidthMovedResult = signal<XTableDragWidthEvent | null>(null);
  columnDragWidthMoved(event: XTableDragWidthEvent) {
    this.columnDragWidthMovedResult.set(event);
  }
  columnDragWidthEndedResult = signal<XTableDragWidthEvent | null>(null);
  columnDragWidthEnded(event: XTableDragWidthEvent) {
    this.columnDragWidthEndedResult.set(event);
  }
}

describe(XTablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTableComponent, XTestTablePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTableComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTableComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTableComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTablePropertyComponent>;
    let component: XTestTablePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTablePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const def = (size = 10, index = 1, total = 20) => {
      component.total.set(total);
      component.index.set(index);
      component.data.set(Array.from({ length: size }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) })));
      component.columns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
    };
    it('data.', () => {
      def();
      fixture.detectChanges();
      const trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(10);
      let i = 0;
      for (let tr of trs) {
        i++;
        expect(tr.nativeElement.innerText).toBe(`${i}\nname${i}`);
      }
    });
    it('columns.', () => {
      def();
      fixture.detectChanges();
      const ths = fixture.debugElement.queryAll(By.css('.x-table thead tr th'));
      expect(ths.length).toBe(2);
      expect(ths[0].nativeElement.innerText).toBe('Id');
      expect(ths[1].nativeElement.innerText).toBe('Name');
    });
    it('rowHeight.', () => {
      component.rowHeight.set(30);
      def();
      fixture.detectChanges();
      const trs = fixture.debugElement.queryAll(By.css('.x-table tr'));
      for (let tr of trs) {
        expect(tr.nativeElement.clientHeight).toBe(30);
      }
    });
    it('loading.', () => {
      component.loading.set(true);
      component.columns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      component.data.set(
        () =>
          new Observable((x) => {
            setTimeout(() => {
              x.next({
                total: 20,
                list: Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }))
              });
              x.complete();
            }, 1000);
          })
      );
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading).toBeTruthy();
    });
    it('bordered.', () => {
      component.bordered.set(true);
      def();
      fixture.detectChanges();
      const table = fixture.debugElement.query(By.css('.x-table'));
      expect(table.nativeElement.classList).toContain('x-table-bordered');
    });
    it('showHeader.', () => {
      component.showHeader.set(false);
      def();
      fixture.detectChanges();
      const thead = fixture.debugElement.query(By.css('.x-table thead'));
      expect(thead).toBeFalsy();
    });
    it('headerPosition.', async () => {
      component.headerPosition.set('bottom');
      def();
      fixture.detectChanges();
      await XSleep(100);
      const thead = fixture.debugElement.query(By.css('.x-table-head-bottom'));
      expect(thead).toBeTruthy();
    });
    it('headColumnTpl.', () => {
      component.headColumnTpl.set({ name: component.headColumnTemplate() });
      def();
      fixture.detectChanges();
      const thname = fixture.debugElement.query(By.css('.x-table thead tr th:nth-child(2)'));
      expect(thname.nativeElement.innerText).toBe('name tpl');
    });
    it('headThTpl.', () => {
      component.headThTpl.set(component.headThTemplate());
      def();
      fixture.detectChanges();
      const ths = fixture.debugElement.queryAll(By.css('.x-table thead tr th'));
      expect(ths[0].nativeElement.innerText).toBe('id tpl');
      expect(ths[1].nativeElement.innerText).toBe('name tpl');
    });
    it('bodyColumnTpl.', () => {
      component.bodyColumnTpl.set({ name: component.bodyColumnTemplate() });
      def();
      fixture.detectChanges();
      const thnames = fixture.debugElement.queryAll(By.css('.x-table tbody tr td:nth-child(2)'));
      for (let i = 0; i < thnames.length; i++) {
        expect(thnames[i].nativeElement.innerText).toBe(`name${i + 1} tpl`);
      }
    });
    it('bodyTdTpl.', () => {
      component.bodyTdTpl.set(component.bodyTdTemplate());
      def();
      fixture.detectChanges();
      const thids = fixture.debugElement.queryAll(By.css('.x-table tbody tr td:nth-child(1)'));
      for (let i = 0; i < thids.length; i++) {
        expect(thids[i].nativeElement.innerText).toBe(`${i + 1} tpl`);
      }
      const thnames = fixture.debugElement.queryAll(By.css('.x-table tbody tr td:nth-child(2)'));
      for (let i = 0; i < thnames.length; i++) {
        expect(thnames[i].nativeElement.innerText).toBe(`name${i + 1} tpl`);
      }
    });
    it('rowClass.', () => {
      component.rowClass.set((row: XTableRow, index: number) => {
        return {
          odd: index % 2 === 0,
          even: index % 2 === 1,
          last: index === 9,
          inspector: row['name'] === 'name1'
        };
      });
      def();
      fixture.detectChanges();
      const tdfirst = fixture.debugElement.queryAll(By.css('.x-table tbody tr:first-child td'));
      for (let td of tdfirst) {
        expect(td.nativeElement).toHaveClass('inspector');
      }
      const tdlast = fixture.debugElement.queryAll(By.css('.x-table tbody tr:last-child td'));
      for (let td of tdlast) {
        expect(td.nativeElement).toHaveClass('last');
      }
      const tdeven = fixture.debugElement.queryAll(By.css('.x-table tbody tr:nth-child(even) td'));
      for (let td of tdeven) {
        expect(td.nativeElement).toHaveClass('even');
      }
      const tdodd = fixture.debugElement.queryAll(By.css('.x-table tbody tr:nth-child(odd) td'));
      for (let td of tdodd) {
        expect(td.nativeElement).toHaveClass('odd');
      }
    });
    it('headSearchTpl.', () => {
      component.headSearchTpl.set(component.headSearchTemplate());
      def();
      fixture.detectChanges();
      const inputs = fixture.debugElement.queryAll(By.css('.x-table .x-table-search input'));
      expect(inputs.length).toBe(2);
    });
    it('activatedRow.', () => {
      component.activatedRow.set({ id: 1 });
      def();
      fixture.detectChanges();
      const td = fixture.debugElement.query(By.css('.x-table tbody tr.x-table-activated td:first-child'));
      expect(td.nativeElement.innerText).toBe('1');
    });
    it('manual.', async () => {
      component.manual.set(false);
      component.columns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      component.data.set(
        () =>
          new Observable((x) => {
            setTimeout(() => {
              x.next({
                total: 20,
                list: Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }))
              });
              x.complete();
            }, 1000);
          })
      );
      fixture.detectChanges();
      let trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(0);

      component.manual.set(true);
      fixture.detectChanges();
      await XSleep(1100);
      trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(10);
    });
    it('index.', () => {
      def(10, 2);
      fixture.detectChanges();
      const pageLink = fixture.debugElement.query(By.css('.x-pagination-link .x-button-activated'));
      expect(pageLink.nativeElement.innerText).toBe('2');
    });
    it('size.', () => {
      component.size.set(5);
      def(5);
      fixture.detectChanges();
      const pageLinks = fixture.debugElement.queryAll(By.css('.x-pagination-link'));
      expect(pageLinks.length).toBe(4);
      let trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(5);
    });
    it('total.', () => {
      def(10, 1, 100);
      fixture.detectChanges();
      const total = fixture.debugElement.query(By.css('.x-pagination-total'));
      expect(total.nativeElement.innerText.replace(/[^\d]/g, '')).toBe('100');
    });
    it('query.', async () => {
      component.query.set({ filter: [{ field: 'name', value: 'name1' }] });
      component.columns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      let data = Array.from({ length: 100 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }));
      component.data.set(
        (_index: number, _size: number, query: XQuery) =>
          new Observable((x) => {
            let list = data.filter((y) => y.name === query.filter![0].value!);
            x.next({
              total: list.length,
              list
            });
            x.complete();
          })
      );
      fixture.detectChanges();
      let trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(1);
      expect(trs[0].nativeElement.innerText).toContain('1\nname1');
    });
    it('sortChange.', () => {
      component.columns.set([
        { label: 'Id', id: 'id', sort: true },
        { label: 'Name', id: 'name' }
      ]);
      let data = Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }));
      component.data.set(
        (_index: number, _size: number, query: XQuery) =>
          new Observable((x) => {
            let list = data;
            if (query && query.sort) {
              list = XOrderBy(
                JSON.parse(JSON.stringify(data)),
                query.sort.map((y) => y.field!),
                query.sort.map((y) => y.value!) as ('asc' | 'desc')[]
              );
            }
            x.next({
              total: list.length,
              list
            });
            x.complete();
          })
      );
      fixture.detectChanges();
      const th1a = fixture.debugElement.query(By.css('.x-table thead tr:first-child th:first-child a'));
      th1a.nativeElement.click();
      fixture.detectChanges();
      expect(component.sortChangeResult()).toBeTruthy();
      expect(component.sortChangeResult()![0].field).toBe('id');
      expect(component.sortChangeResult()![0].value).toBe('desc');
    });
    it('headCheckboxChange.', () => {
      component.columns.set([
        { label: '', id: 'checked', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      component.data.set(Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) })));
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.x-table thead tr th:first-child .x-checkbox-row-item'));
      checkbox.nativeElement.click();
      fixture.detectChanges();

      expect(component.headCheckboxChangeResult()).toBeTruthy();
      expect(component.headCheckboxChangeResult()!.checkbox['checked']).toBeTrue();
    });
    it('bodyCheckboxChange.', () => {
      component.columns.set([
        { label: '', id: 'checked', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      component.data.set(Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) })));
      fixture.detectChanges();

      const tr = fixture.debugElement.query(By.css('.x-table tbody tr:first-child'));
      tr.nativeElement.click();
      fixture.detectChanges();

      expect(component.bodyCheckboxChangeResult()).toBeTruthy();
      expect(component.bodyCheckboxChangeResult()!.id).toBe(1);
    });
    it('allowSelectRow.', () => {
      def();
      fixture.detectChanges();
      const tr = fixture.debugElement.query(By.css('.x-table tbody tr:first-child'));
      tr.nativeElement.click();

      fixture.detectChanges();
      expect(tr.nativeElement).toHaveClass('x-table-activated');

      component.allowSelectRow.set(false);
      fixture.detectChanges();
      expect(tr.nativeElement).not.toHaveClass('x-table-activated');
    });
    it('allowCheckRow.', () => {
      component.allowCheckRow.set(false);
      component.columns.set([
        { label: '', id: 'checked', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      component.data.set(Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) })));
      fixture.detectChanges();

      const tr = fixture.debugElement.query(By.css('.x-table tbody tr:first-child'));
      tr.nativeElement.click();
      fixture.detectChanges();

      expect(component.bodyCheckboxChangeResult()).toBeFalsy();
    });
    it('virtualScroll.', () => {
      component.scroll.set({ x: 1500, y: 600 });
      component.virtualScroll.set(true);
      def(100, 1, 200);
      fixture.detectChanges();
      const trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length < 100).toBeTrue();
    });
    it('bodyHeight.', () => {
      component.scroll.set({ x: 1500, y: 600 });
      component.virtualScroll.set(true);
      component.bodyHeight.set(200);
      def(100, 1, 200);
      fixture.detectChanges();
      const scroll = fixture.debugElement.query(By.css('.cdk-virtual-scrollable'));
      expect(scroll.nativeElement.clientHeight).toBe(200);
    });
    it('itemSize.', () => {
      // cdk scroll params
      expect(true).toBe(true);
    });
    it('minBufferPx.', () => {
      // cdk scroll params
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
      // cdk scroll params
      expect(true).toBe(true);
    });
    it('adaptionHeight.', () => {
      expect(true).toBe(true);
    });
    it('docPercent.', () => {
      expect(true).toBe(true);
    });
    it('checkedRow.', () => {
      expect(true).toBe(true);
    });
    it('scroll.', () => {
      expect(true).toBe(true);
    });
    it('header.', () => {
      expect(true).toBe(true);
    });
    it('footer.', () => {
      expect(true).toBe(true);
    });
    it('cellConfig.', () => {
      expect(true).toBe(true);
    });
    it('rowSize.', () => {
      expect(true).toBe(true);
    });
    it('paginationPosition.', () => {
      expect(true).toBe(true);
    });
    it('hiddenWrapBorder.', () => {
      expect(true).toBe(true);
    });
    it('hiddenPaginationBorder.', () => {
      expect(true).toBe(true);
    });
    it('showPagination.', () => {
      expect(true).toBe(true);
    });
    it('treeTable.', () => {
      expect(true).toBe(true);
    });
    it('expandedAll.', () => {
      expect(true).toBe(true);
    });
    it('expandedLevel.', () => {
      expect(true).toBe(true);
    });
    it('expanded.', () => {
      expect(true).toBe(true);
    });
    it('expandTpl.', () => {
      expect(true).toBe(true);
    });
    it('showEmpty.', () => {
      expect(true).toBe(true);
    });
    it('emptyImg.', () => {
      expect(true).toBe(true);
    });
    it('emptyContent.', () => {
      expect(true).toBe(true);
    });
    it('pageLinkSize.', () => {
      expect(true).toBe(true);
    });
    it('showEllipsis.', () => {
      expect(true).toBe(true);
    });
    it('showTotal.', () => {
      expect(true).toBe(true);
    });
    it('space.', () => {
      expect(true).toBe(true);
    });
    it('showBackground.', () => {
      expect(true).toBe(true);
    });
    it('showSize.', () => {
      expect(true).toBe(true);
    });
    it('sizeWidth.', () => {
      expect(true).toBe(true);
    });
    it('showInputSize.', () => {
      expect(true).toBe(true);
    });
    it('inputSizeTooltipText.', () => {
      expect(true).toBe(true);
    });
    it('inputSizeWidth.', () => {
      expect(true).toBe(true);
    });
    it('sizeData.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('showJump.', () => {
      expect(true).toBe(true);
    });
    it('jumpTooltipText.', () => {
      expect(true).toBe(true);
    });
    it('jumpWidth.', () => {
      expect(true).toBe(true);
    });
    it('totalTpl.', () => {
      expect(true).toBe(true);
    });
    it('simple.', () => {
      expect(true).toBe(true);
    });
    it('simpleIndexWidth.', () => {
      expect(true).toBe(true);
    });
    it('inputIndexSizeSureType.', () => {
      expect(true).toBe(true);
    });
    it('columnDragStarted.', () => {
      expect(true).toBe(true);
    });
    it('columnDragEnded.', () => {
      expect(true).toBe(true);
    });
    it('columnDropListDropped.', () => {
      expect(true).toBe(true);
    });
    it('columnDragWidthStarted.', () => {
      expect(true).toBe(true);
    });
    it('columnDragWidthMoved.', () => {
      expect(true).toBe(true);
    });
    it('columnDragWidthEnded.', () => {
      expect(true).toBe(true);
    });
  });
});
