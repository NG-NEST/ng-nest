import { Directive, HostListener, inject, input, signal } from '@angular/core';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XTableRow } from './table.property';
import { XTableCheckboxDragSelectService } from './checkbox-drag-select.service';

@Directive({
  selector: '[xTableCheckboxDragSelect]'
})
export class XTableCheckboxDragSelectDirective {
  private dragSelectService = inject(XTableCheckboxDragSelectService);

  checkbox = inject(XCheckboxComponent, { host: true });

  // 新增：所有行数据
  dragRows = input.required<XTableRow[]>();
  dragRow = input.required<XTableRow>();
  dragKey = input.required<string>();

  downValue = signal(false);

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.isCheckboxLike(target)) {
      this.dragSelectService.isDragging = true;
      this.downValue.set(!!this.checkbox.value());
      // 记录起始行信息
      this.dragSelectService.startIndex = this.dragRows().findIndex((row) => row.id === this.dragRow().id);
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragSelectService.isDragging = false;
    this.dragSelectService.startIndex = -1;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragSelectService.isDragging || this.dragSelectService.startIndex === -1) return;

    // 获取当前鼠标所在行元素
    const rowEl = (event.target as HTMLElement).closest('tr');

    if (!rowEl) return;

    // 获取当前行key
    const currentKey = rowEl.getAttribute('data-row-key');
    const currentIndex = this.dragRows().findIndex((row) => `${row.id}` === currentKey);

    if (currentIndex === -1) return;

    // 计算选择范围
    const minIndex = Math.min(this.dragSelectService.startIndex, currentIndex);
    const maxIndex = Math.max(this.dragSelectService.startIndex, currentIndex);
    const checked = !this.downValue();

    // 更新范围内所有行的选中状态
    this.dragRows().forEach((row, index) => {
      if (index >= minIndex && index <= maxIndex) {
        row[this.dragKey()] = checked;
      }
    });

    event.preventDefault();
  }

  private isCheckboxLike(el: HTMLElement): boolean {
    return el.classList.contains('x-checkbox-box');
  }
}
