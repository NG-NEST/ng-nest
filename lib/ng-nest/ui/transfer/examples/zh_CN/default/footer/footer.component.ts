import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-footer',
  imports: [FormsModule, XTransferComponent, XButtonComponent],
  templateUrl: './footer.component.html'
})
export class ExFooterComponent {
  value = signal([1, 3, 7]);
  data = signal<XTransferNode[]>(
    Array.from({ length: 15 }).map((_x, i) => {
      return { id: i + 1, label: '备选项 ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
    })
  );
}
