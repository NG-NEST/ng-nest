import { Component } from '@angular/core';
import { XTreeSelectComponent } from '@ng-nest/ui/tree-select';

@Component({
  selector: 'ex-scroll',
  standalone: true,
  imports: [XTreeSelectComponent],
  templateUrl: './scroll.component.html'
})
export class ExScrollComponent {
  data = [
    { id: 1, label: 'Fruit' },
    { id: 2, label: 'Vegetable' },
    { id: 3, label: 'Drink' },
    ...Array.from({ length: 1000 }).map((_, index) => ({ id: 10000 + index, label: `Cate ${index + 4}` })),
    { id: 4, label: 'Apple', pid: 1 },
    { id: 5, label: 'Banana', pid: 1 },
    { id: 6, label: 'Pear', pid: 1 },
    { id: 7, label: 'Lettuce', pid: 2 },
    { id: 8, label: 'Cabbage', pid: 2 },
    { id: 9, label: 'Leek', pid: 2 },
    ...Array.from({ length: 1000 }).map((_, index) => ({ id: 1000000 + index, label: `Vegetable ${index + 4}`, pid: 2 })),
    { id: 10, label: 'Soda', pid: 3 },
    { id: 11, label: 'Juice', pid: 3 },
    { id: 12, label: 'Purified water', pid: 3 },
    { id: 13, label: 'Millet banana', pid: 5 },
    { id: 14, label: 'Canna edulis', pid: 5 },
    { id: 15, label: 'Emperor banana', pid: 5 }
  ];
}
