import { Component } from '@angular/core';
import { XTransferNode } from '@ng-nest/ui/transfer';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((x, i) => {
    return { id: i + 1, label: '用户 ' + (i + 1), icon: 'fto-user', disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
  });
  change(data: any[]) {
    console.log(data);
  }
}
