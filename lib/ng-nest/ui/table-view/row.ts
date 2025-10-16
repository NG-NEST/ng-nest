import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  signal
} from '@angular/core';
import {
  CdkCellOutlet,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkNoDataRow,
  CdkRow,
  CdkRowDef
} from '@angular/cdk/table';
import { XTableViewService } from './table-view.service';
import { XTableView } from './table-view.component';

const ROW_TEMPLATE = `<ng-container cdkCellOutlet></ng-container>`;

@Directive({
  selector: '[xTableHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: XTableHeaderRowDef }],
  inputs: [
    { name: 'columns', alias: 'xTableHeaderRowDef' },
    { name: 'sticky', alias: 'xTableHeaderRowDefSticky', transform: booleanAttribute }
  ]
})
export class XTableHeaderRowDef extends CdkHeaderRowDef {}

@Directive({
  selector: '[xTableFooterRowDef]',
  providers: [{ provide: CdkFooterRowDef, useExisting: XTableFooterRowDef }],
  inputs: [
    { name: 'columns', alias: 'xTableFooterRowDef' },
    { name: 'sticky', alias: 'xTableFooterRowDefSticky', transform: booleanAttribute }
  ]
})
export class XTableFooterRowDef extends CdkFooterRowDef {}

@Directive({
  selector: '[xTableRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: XTableViewRowDef }],
  inputs: [
    { name: 'columns', alias: 'xTableRowDefColumns' },
    { name: 'when', alias: 'xTableRowDefWhen' }
  ]
})
export class XTableViewRowDef<T> extends CdkRowDef<T> {}

@Component({
  selector: 'x-table-header-row, tr[x-table-header-row]',
  template: ROW_TEMPLATE,
  host: {
    class: 'x-table-header-row',
    role: 'row'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'xTableHeaderRow',
  providers: [{ provide: CdkHeaderRow, useExisting: XTableHeaderRow }],
  imports: [CdkCellOutlet]
})
export class XTableHeaderRow extends CdkHeaderRow {
  tableView = inject(XTableView, { optional: true });
  tableViewService = inject(XTableViewService, { optional: true })!;
  sticking = signal(false);

  @HostBinding('class.x-table-sticky-top') get isSticking() {
    return this.sticking();
  }

  ngAfterViewInit() {
    this.listenerSticky();
  }

  listenerSticky() {
    const index = this.tableView?.headerRows().findIndex((x) => x === this);
    if (index === undefined || index < 0) return;
    const rowLen = this.tableView?.headerRowRefs()?.length ?? 0;
    if (rowLen === 0 || rowLen < index) return;
    const sticky = this.tableView?.headerRowRefs()[index].sticky;
    if (!sticky) return;
    const sentinel = this.tableView?.sentinelTop()!.nativeElement!;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const sticking = !entry.isIntersecting;
        if (sticking) {
          if (!this.tableViewService.stickyHeaderRows.includes(this)) {
            this.tableViewService.stickyHeaderRows.push(this);
          }
        } else {
          if (this.tableViewService.stickyHeaderRows.includes(this)) {
            this.tableViewService.stickyHeaderRows = this.tableViewService.stickyHeaderRows.filter(
              (item) => item !== this
            );
          }
        }
        this.sticking.set(sticking);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
  }
}

@Component({
  selector: 'x-table-footer-row, tr[x-table-footer-row]',
  template: ROW_TEMPLATE,
  host: {
    class: 'x-table-footer-row',
    role: 'row'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'xTableFooterRow',
  providers: [{ provide: CdkFooterRow, useExisting: XTableFooterRow }],
  imports: [CdkCellOutlet]
})
export class XTableFooterRow extends CdkFooterRow {}

@Component({
  selector: 'x-table-row, tr[x-table-row]',
  template: ROW_TEMPLATE,
  host: {
    class: 'x-table-row',
    role: 'row'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'xTableRow',
  providers: [{ provide: CdkRow, useExisting: XTableViewRow }],
  imports: [CdkCellOutlet]
})
export class XTableViewRow extends CdkRow {
  tableViewService = inject(XTableViewService, { optional: true })!;

  @HostBinding('class.x-table-row-actived') get isActived() {
    return this.tableViewService.activedRows.includes(this);
  }
}

@Directive({
  selector: 'ng-template[xTableNoDataRow]',
  providers: [{ provide: CdkNoDataRow, useExisting: XTableNoDataRow }]
})
export class XTableNoDataRow extends CdkNoDataRow {
  override _contentClassNames = ['x-table-no-data-row'];
}
