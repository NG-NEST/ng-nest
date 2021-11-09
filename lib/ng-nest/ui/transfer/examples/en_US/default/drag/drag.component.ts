import { Component } from '@angular/core';
import { XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-drag',
  templateUrl: './drag.component.html'
})
export class ExDragComponent {
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((_x, i) => {
    return { id: i + 1, label: 'Alternative ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
  });
}
