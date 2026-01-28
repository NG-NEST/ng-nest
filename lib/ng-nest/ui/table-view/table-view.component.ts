import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  CdkTable,
  CDK_TABLE,
  STICKY_POSITIONING_LISTENER,
  HeaderRowOutlet,
  DataRowOutlet,
  NoDataRowOutlet,
  FooterRowOutlet
} from '@angular/cdk/table';

import { XTableViewProperty } from './table-view.property';
import { XTableViewService } from './table-view.service';
import { XTableViewCell, XTableColumnDef, XTableHeaderCell } from './cell';
import { XTableHeaderRow, XTableHeaderRowDef, XTableViewRow } from './row';
import { X_TABLE_VIEW_CONTEXT } from './table-view.token';

@Component({
  selector: 'x-table-view, table[x-table-view]',
  exportAs: 'xTableView',
  templateUrl: 'table-view.component.html',
  styleUrl: 'table-view.component.scss',
  host: {
    class: 'x-table-view',
    '[class.x-table-fixed-layout]': 'fixedLayout'
  },
  providers: [
    { provide: CdkTable, useExisting: XTableView },
    { provide: CDK_TABLE, useExisting: XTableView },
    { provide: STICKY_POSITIONING_LISTENER, useValue: null },
    {
      provide: X_TABLE_VIEW_CONTEXT,
      useExisting: XTableView
    },
    XTableViewService
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [HeaderRowOutlet, DataRowOutlet, NoDataRowOutlet, FooterRowOutlet]
})
export class XTableView<T> extends XTableViewProperty<T> {
  elementRef = inject(ElementRef);
  sentinelTop = viewChild<ElementRef<HTMLElement>>('sentinelTop');
  headerRowRef = contentChild(XTableHeaderRowDef);
  headerRowRefs = contentChildren(XTableHeaderRowDef);
  headerRows = contentChildren(XTableHeaderRow);
  columnDefs = contentChildren(XTableColumnDef);
  headerCells = contentChildren(XTableHeaderCell);

  cells = contentChildren(XTableViewCell);
  rows = contentChildren(XTableViewRow);

  /** Overrides the sticky CSS class set by the `CdkTable`. */
  protected override stickyCssClass = 'x-table-sticky';

  /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
  protected override needsPositionStickyOnElement = false;

  getHeaderRows() {
    return this.headerRows();
  }

  getHeaderRowRefs() {
    return this.headerRowRefs();
  }

  getSentinelTop() {
    return this.sentinelTop();
  }

  getHeaderCells() {
    return this.headerCells();
  }

  getCells() {
    return this.cells();
  }

  getRows() {
    return this.rows();
  }
}
