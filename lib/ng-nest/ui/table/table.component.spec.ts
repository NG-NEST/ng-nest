import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
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
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XData, XDataArray, XQuery, XSize, XSort, XTemplate } from '@ng-nest/ui/core';
import { XPaginationInputIndexSizeSureType, XPaginationSizeData } from '@ng-nest/ui/pagination';
import { XSelectNode } from '@ng-nest/ui/select';

@Component({
  standalone: true,
  imports: [XTableComponent],
  template: ` <x-table> </x-table> `
})
class XTestTableComponent {}

@Component({
  standalone: true,
  imports: [XTableComponent],
  template: `
    <x-table
      [(activatedRow)]="activatedRow"
      [(manual)]="manual"
      [(index)]="index"
      [(size)]="size"
      [(total)]="total"
      [(query)]="query"
    >
    </x-table>
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
  headThTpl = signal<XTemplate | null>(null);
  bodyColumnTpl = signal<XTableTemplate>({});
  bodyTdTpl = signal<XTemplate | null>(null);
  rowClass = signal<((row: XTableRow, index: number) => { [className: string]: boolean }) | null>(null);
  headSearchTpl = signal<XTemplate | null>(null);

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
  treeTable = signal(true);
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
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestTablePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTablePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('top.', () => {
      expect(true).toBe(true);
    });
    it('left.', () => {
      expect(true).toBe(true);
    });
  });
});
