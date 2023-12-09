import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  standalone: true,
  imports: [FormsModule, XTreeSelectComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data: XTreeSelectNode[] = [
    { id: 1, label: 'Fruit' },
    { id: 2, label: 'Vegetable' },
    { id: 3, label: 'Drink' },
    { id: 4, label: 'Apple', pid: 1 },
    { id: 5, label: 'Banana', pid: 1 },
    { id: 6, label: 'Pear', pid: 1 },
    { id: 7, label: 'Lettuce', pid: 2 },
    { id: 8, label: 'Cabbage', pid: 2 },
    { id: 9, label: 'Leek', pid: 2 },
    { id: 10, label: 'Soda', pid: 3 },
    { id: 11, label: 'Juice', pid: 3 },
    { id: 12, label: 'Purified water', pid: 3 },
    { id: 13, label: 'Millet banana', pid: 5 },
    { id: 14, label: 'Canna edulis', pid: 5 },
    { id: 15, label: 'Emperor banana', pid: 5 }
  ];
  model1: any;
  model2: any;

  getData1 = new Observable<XTreeSelectNode[]>((x) => {
    setTimeout(() => {
      x.next(JSON.parse(JSON.stringify(this.data)));
      x.complete();
    }, 300);
  });

  getData2 = (): Observable<XTreeSelectNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(JSON.parse(JSON.stringify(this.data)));
        x.complete();
      }, 300);
    });
  };

  change(event: any) {
    console.log(event);
  }
}
