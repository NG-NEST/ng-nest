import { Component } from '@angular/core';
import { XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-inverse',
  templateUrl: './inverse.component.html'
})
export class ExInverseComponent {
  // list
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((_x, i) => {
    return { id: i + 1, label: 'Alternative ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
  });

  constructor() {}
}
