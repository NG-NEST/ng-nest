import { Directive, ElementRef, HostBinding, HostListener, inject, Input } from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef
} from '@angular/cdk/table';
import { XTableViewService } from './table-view.service';
import { XTableView } from './table-view.component';

@Directive({
  selector: '[xTableCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: XTableCellDef }]
})
export class XTableCellDef extends CdkCellDef {}

@Directive({
  selector: '[xTableHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: XTableHeaderCellDef }]
})
export class XTableHeaderCellDef extends CdkHeaderCellDef {}

@Directive({
  selector: '[xTableFooterCellDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: XTableFooterCellDef }]
})
export class XTableFooterCellDef extends CdkFooterCellDef {}

@Directive({
  selector: '[xTableColumnDef]',
  providers: [{ provide: CdkColumnDef, useExisting: XTableColumnDef }]
})
export class XTableColumnDef extends CdkColumnDef {
  @Input('xTableColumnDef')
  override get name(): string {
    return this._name;
  }
  override set name(name: string) {
    this._setNameInput(name);
  }
  protected override _updateColumnCssClassName() {
    super._updateColumnCssClassName();
    this._columnCssClassName!.push(`x-table-column-${this.cssClassFriendlyName}`);
  }
}

@Directive({
  selector: 'x-table-header-cell, th[x-table-header-cell]',
  host: {
    class: 'x-table-header-cell',
    role: 'columnheader'
  }
})
export class XTableHeaderCell extends CdkHeaderCell {
  tableViewService = inject(XTableViewService, { optional: true })!;
  tableView = inject(XTableView, { optional: true });
  elementRef = inject(ElementRef);

  @HostBinding('class.x-table-header-cell-actived') get isActived() {
    return this.tableViewService.activedHeaderCells.includes(this);
  }

  @HostListener('click') onClick() {
    this.tableViewService.activedHeaderCells = [this];

    const headerCells = this.tableView?.headerCells() ?? [];
    const index = headerCells.indexOf(this);

    const cells = this.tableView?.cells() ?? [];
    const columnsCount = (this.tableView?.headerRowRef()?.columns as string[]).length ?? 0;
    const rowsCount = this.tableView?.rows().length ?? 0;

    if (columnsCount === 0 || rowsCount === 0) {
      return;
    }

    const columnCells: XTableCell[] = [];
    for (let i = 0; i < rowsCount; i++) {
      const cellIndex = index * rowsCount + i;
      if (cellIndex < cells.length) {
        columnCells.push(cells[cellIndex]);
      }
    }

    this.tableViewService.selectedCells = [];

    for (let cell of columnCells) {
      this.tableViewService.selectedCells.push(cell);
      cell.setActivedRow(cell);
    }
  }
}

@Directive({
  selector: 'x-table-footer-cell, td[x-table-footer-cell]',
  host: {
    class: 'x-table-footer-cell'
  }
})
export class XTableFooterCell extends CdkFooterCell {}

@Directive({
  selector: 'x-table-cell, td[x-table-cell]',
  host: {
    class: 'x-table-cell'
  }
})
export class XTableCell extends CdkCell {
  tableViewService = inject(XTableViewService, { optional: true })!;
  tableView = inject(XTableView, { optional: true });
  elementRef = inject(ElementRef);
  @HostBinding('class.x-table-cell-selected') get isSelected() {
    return this.tableViewService.selectedCells.includes(this);
  }

  @HostListener('click') onClick() {
    this.tableViewService.selectedCells = [this];
    this.tableViewService.activedRows = [];
    this.setActivedRow(this);
    this.setActivedColumn(this);
  }

  setActivedRow(cell: XTableCell) {
    const rows = this.tableView?.rows() ?? [];
    if (rows.length > 0) {
      const rowIndex = this.getRowIndex(cell);
      if (rowIndex >= 0 && rowIndex < rows.length) {
        const currentRow = rows[rowIndex];
        this.tableViewService.activedRows.push(currentRow);
      }
    }
  }

  setActivedColumn(cell: XTableCell) {
    const headerCells = (this.tableView?.headerCells() ?? []) as XTableHeaderCell[];
    const headerRowRefs = this.tableView?.headerRowRefs() ?? [];
    const headerCellsArray = this.convertToColumnBasedArray(headerCells, headerRowRefs.length);
    const activedHeaderCells: XTableHeaderCell[] = [];
    for (let cells of headerCellsArray) {
      if (cells.length > 0) {
        const columnIndex = this.getColumnIndex(cell);
        if (columnIndex >= 0 && columnIndex < cells.length) {
          activedHeaderCells.push(cells[columnIndex]);
        }
      }
    }
    this.tableViewService.activedHeaderCells = activedHeaderCells;
  }

  private convertToColumnBasedArray<T>(input: T[], columnsPerRow: number): T[][] {
    const result: T[][] = [];

    for (let i = 0; i < columnsPerRow; i++) {
      result.push([]);
    }

    for (let i = 0; i < input.length; i++) {
      const columnIndex = i % columnsPerRow;
      result[columnIndex].push(input[i]);
    }

    return result;
  }

  private getColumnIndex(cell: XTableCell): number {
    if (!this.tableView || !this.tableView.cells()) return -1;
    const cellsArray = this.tableView.cells();
    const selectedIndex = cellsArray.indexOf(cell);
    if (selectedIndex === -1) return -1;
    const columnsPerRow = (this.tableView.headerRowRef()?.columns as string[]).length ?? 0;
    const rowsCount = this.tableView.rows().length;
    if (columnsPerRow === 0 || rowsCount === 0) return -1;

    return Math.floor(selectedIndex / rowsCount);
  }

  private getRowIndex(cell: XTableCell): number {
    if (!this.tableView || !this.tableView.cells()) return -1;
    const cellsArray = this.tableView.cells();
    const selectedIndex = cellsArray.indexOf(cell);
    if (selectedIndex === -1) return -1;
    const columnsPerRow = (this.tableView.headerRowRef()?.columns as string[]).length ?? 0;
    const rowsCount = this.tableView.rows().length;
    if (columnsPerRow === 0 || rowsCount === 0) return -1;

    return selectedIndex % rowsCount;
  }
}
