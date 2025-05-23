import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-inverse',
  imports: [FormsModule, XTransferComponent],
  templateUrl: './inverse.component.html'
})
export class ExInverseComponent {
  value = signal([1, 3, 7]);
  data = signal<XTransferNode[]>(
    Array.from({ length: 15 }).map((_x, i) => {
      return { id: i + 1, label: 'Alternative ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
    })
  );
}
