import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-drag',
  imports: [FormsModule, XTransferComponent],
  templateUrl: './drag.component.html'
})
export class ExDragComponent {
  value = signal([1, 3, 7]);
  data = signal<XTransferNode[]>(
    Array.from({ length: 15 }).map((_x, i) => {
      return { id: i + 1, label: '备选项 ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
    })
  );
}
