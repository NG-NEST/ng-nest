import { Directive, ElementRef, HostBinding, HostListener, inject, Input, TemplateRef } from '@angular/core';
import { XTableViewService } from './table-view.service';
import { XTableViewComponent } from './table-view';

@Directive({
  selector: '[xCellDef]'
})
export class XCellDef {
  @Input() xCellDef: string = '';
  template = inject<TemplateRef<any>>(TemplateRef);
}

@Directive({
  selector: '[xHeaderCellDef]'
})
export class XHeaderCellDef {
  @Input() xHeaderCellDef: string = '';
  template = inject<TemplateRef<any>>(TemplateRef);
}

@Directive({
  selector: 'x-cell, td[x-cell]'
})
export class XCell {
  tableViewService = inject(XTableViewService, { optional: true })!;
  tableView = inject(XTableViewComponent, { optional: true });
  elementRef = inject(ElementRef);

  @HostBinding('class.x-cell') cellClass = true;
  @HostBinding('class.x-cell-selected') get isSelected() {
    return this.tableViewService.selectedCells.includes(this);
  }

  @HostListener('click') onClick() {
    this.tableViewService.selectedCells = [this];
    this.tableViewService.activedRows = [];
    this.setActivedRow(this);
    this.setActivedHeaderCell(this);
  }

  setActivedRow(cell: XCell) {
    const rows = this.tableView?.rows.toArray() ?? [];

    if (rows.length > 0) {
      const rowIndex = this.getRowIndex(cell);

      if (rowIndex >= 0 && rowIndex < rows.length) {
        const currentRow = rows[rowIndex];
        this.tableViewService.activedRows.push(currentRow);
      }
    }
  }

  setActivedHeaderCell(cell: XCell) {
    const headerCells = this.tableView?.headerCells.toArray() ?? [];

    if (headerCells.length > 0) {
      const columnIndex = this.getColumnIndex(cell);

      if (columnIndex >= 0 && columnIndex < headerCells.length) {
        this.tableViewService.activedHeaderCell = headerCells[columnIndex];
      }
    }
  }

  private getColumnIndex(cell: XCell): number {
    if (!this.tableView || !this.tableView.cells) return -1;

    const cellsArray = this.tableView.cells.toArray();
    const selectedIndex = cellsArray.indexOf(cell);

    if (selectedIndex === -1) return -1;

    const columnsPerRow = this.tableView.columns().length;
    const rowsCount = this.tableView.data().length;

    if (columnsPerRow === 0 || rowsCount === 0) return -1;

    return Math.floor(selectedIndex / rowsCount);
  }

  private getRowIndex(cell: XCell): number {
    if (!this.tableView || !this.tableView.cells) return -1;

    const cellsArray = this.tableView.cells.toArray();
    const selectedIndex = cellsArray.indexOf(cell);

    if (selectedIndex === -1) return -1;

    const columnsPerRow = this.tableView.columns().length;
    const rowsCount = this.tableView.data().length;

    if (columnsPerRow === 0 || rowsCount === 0) return -1;

    return selectedIndex % rowsCount;
  }
}

@Directive({
  selector: 'x-header-cell, th[x-header-cell]'
})
export class XHeaderCell {
  tableViewService = inject(XTableViewService, { optional: true })!;
  tableView = inject(XTableViewComponent, { optional: true });

  @HostBinding('class.x-header-cell') cellClass = true;
  @HostBinding('class.x-header-cell-actived') get isActived() {
    return this.tableViewService.activedHeaderCell === this;
  }

  @HostListener('click') onClick() {
    this.tableViewService.activedHeaderCell = this;

    const headerCells = this.tableView?.headerCells.toArray() ?? [];
    const index = headerCells.indexOf(this);

    const cells = this.tableView?.cells.toArray() ?? [];
    const columnsCount = this.tableView?.columns().length ?? 0;
    const rowsCount = this.tableView?.data().length ?? 0;

    if (columnsCount === 0 || rowsCount === 0) {
      return;
    }

    const columnCells: any[] = [];
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
