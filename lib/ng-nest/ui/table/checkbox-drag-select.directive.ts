import { Directive, DOCUMENT, HostListener, inject, input, output } from '@angular/core';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import type { XTableColumn, XTableRow } from './table.property';
import { XTableCheckboxDragSelectService } from './checkbox-drag-select.service';

@Directive({
  selector: '[xTableCheckboxDragSelect]'
})
export class XTableCheckboxDragSelectDirective {
  private dragSelectService = inject(XTableCheckboxDragSelectService);
  private document = inject(DOCUMENT);
  private dragTimeout: any;

  checkbox = inject(XCheckboxComponent, { host: true });

  dragRows = input.required<XTableRow[]>();
  dragRow = input.required<XTableRow>();
  dragColumn = input.required<XTableColumn>();
  dragDisabled = input<boolean>(false);

  dragStart = output();
  dragMove = output();
  dragEnd = output<XTableRow[]>();

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.dragDisabled()) return;
    const target = event.target as HTMLElement;

    if (this.isCheckboxLike(target)) {
      this.dragTimeout = setTimeout(() => {
        this.dragSelectService.downValue = !!this.checkbox.value();
        this.dragSelectService.startIndex = this.dragRows().findIndex((row) => row.id === this.dragRow().id);
        this.dragSelectService.isMouseDown = true;
      }, 100);

      event.preventDefault();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.dragDisabled()) return;
    clearTimeout(this.dragTimeout);
    if (this.dragSelectService.isDragging) {
      this.dragEnd.emit(this.dragSelectService.changeRows);
    }
    this.dragSelectService.isDragging = false;
    this.dragSelectService.startIndex = -1;
    this.dragSelectService.downValue = false;
    this.dragSelectService.isMouseDown = false;
    this.dragSelectService.changeRows = [];
    this.document.body.style.cursor = '';
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragDisabled()) return;
    if (!this.dragSelectService.isMouseDown) return;
    if (!this.dragSelectService.isDragging) {
      this.dragSelectService.isDragging = true;
      this.document.body.style.cursor = 'pointer';
      this.dragStart.emit();
    }

    if (this.dragSelectService.startIndex === -1) return;

    const rowEl = (event.target as HTMLElement).closest('tr');

    if (!rowEl) return;

    const currentKey = rowEl.getAttribute('data-row-key');
    const currentIndex = this.dragRows().findIndex((row) => `${row.id}` === currentKey);

    if (currentIndex === -1) return;

    const minIndex = Math.min(this.dragSelectService.startIndex, currentIndex);
    const maxIndex = Math.max(this.dragSelectService.startIndex, currentIndex);
    const checked = !this.dragSelectService.downValue;

    this.dragRows().forEach((row, index) => {
      if (index >= minIndex && index <= maxIndex) {
        if (!row.disabled) {
          row[this.dragColumn().id] = checked;
          if (!this.dragSelectService.changeRows.some((x) => x.id === row.id)) {
            this.dragSelectService.changeRows.push(row);
          }
        }
      }
    });

    this.dragMove.emit();

    event.preventDefault();
  }

  private isCheckboxLike(el: HTMLElement): boolean {
    return el.classList.contains('x-checkbox-box');
  }
}
