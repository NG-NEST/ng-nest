import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTreeSelectComponent } from '@ng-nest/ui/tree-select';

@Component({
  selector: 'ex-multiple',
  standalone: true,
  imports: [FormsModule, XTreeSelectComponent],
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  data1 = [
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
  data2 = JSON.parse(JSON.stringify(this.data1));
  data3 = JSON.parse(JSON.stringify(this.data1));
  data4 = JSON.parse(JSON.stringify(this.data1));
  data5 = JSON.parse(JSON.stringify(this.data1));
  data6 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2 = [4, 13];
  model3 = [
    { id: 4, label: 'Apple' },
    { id: 13, label: 'Millet banana' }
  ];
  model4 = [4, 13];
  model5 = [4, 9, 10, 13];
  model6 = [4, 9, 10, 13];

  change(event: any) {
    console.log(event);
  }
}
