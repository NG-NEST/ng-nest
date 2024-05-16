import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [FormsModule, XTransferComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  value = signal([1, 3, 7]);
  data = signal<XTransferNode[]>(
    Array.from({ length: 15 }).map((_x, i) => {
      return { id: i + 1, label: 'user ' + (i + 1), icon: 'fto-user', disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
    })
  );
  change(data: any[]) {
    console.log(data);
  }
}
