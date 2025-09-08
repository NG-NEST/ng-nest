import { Component } from '@angular/core';
import { XScrollableModule } from '@ng-nest/ui/scrollable';
import { XTableViewModule } from '@ng-nest/ui/table-view';

@Component({
  selector: 'ex-default',
  imports: [XTableViewModule, XScrollableModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = Array.from({ length: 100 }).map((_, i) => ({
    name: `Edward ${i}`,
    money1: i,
    money2: i,
    money3: i,
    money4: i,
    money5: i,
    money6: i,
    money7: i,
    money8: i,
    money9: i,
    money10: i,
    money11: i
  }));

  columns = [
    'name',
    'money1',
    'money2',
    'money3',
    'money4',
    'money5',
    'money6',
    'money7',
    'money8',
    'money9',
    'money10',
    'money11'
  ];

  getTotal(column: string) {
    return this.data.map((t: any) => t[column]).reduce((acc, value) => acc + value, 0);
  }
}
