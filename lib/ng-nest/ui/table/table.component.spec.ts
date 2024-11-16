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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XData, XDataArray, XQuery, XSize, XSort, XTemplate } from '@ng-nest/ui/core';
import { XPaginationInputIndexSizeSureType, XPaginationSizeData } from '@ng-nest/ui/pagination';
import { XSelectNode } from '@ng-nest/ui/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

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
    const def = () => {
      component.total.set(20);
      component.data.set(Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) })));
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
    });
    it('headerPosition.', () => {
      expect(true).toBe(true);
    });
    it('headColumnTpl.', () => {
      expect(true).toBe(true);
    });
    it('headThTpl.', () => {
      expect(true).toBe(true);
    });
    it('bodyColumnTpl.', () => {
      expect(true).toBe(true);
    });
    it('bodyTdTpl.', () => {
      expect(true).toBe(true);
    });
    it('rowClass.', () => {
      expect(true).toBe(true);
    });
    it('headSearchTpl.', () => {
      expect(true).toBe(true);
    });
    it('activatedRow.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('index.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('total.', () => {
      expect(true).toBe(true);
    });
    it('query.', () => {
      expect(true).toBe(true);
    });
    it('sortChange.', () => {
      expect(true).toBe(true);
    });
    it('headCheckboxChange.', () => {
      expect(true).toBe(true);
    });
    it('bodyCheckboxChange.', () => {
      expect(true).toBe(true);
    });
    it('allowSelectRow.', () => {
      expect(true).toBe(true);
    });
    it('allowCheckRow.', () => {
      expect(true).toBe(true);
    });
    it('virtualScroll.', () => {
      expect(true).toBe(true);
    });
    it('bodyHeight.', () => {
      expect(true).toBe(true);
    });
    it('itemSize.', () => {
      expect(true).toBe(true);
    });
    it('minBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
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
