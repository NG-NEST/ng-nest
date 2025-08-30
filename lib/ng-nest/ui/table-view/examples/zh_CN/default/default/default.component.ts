import { Component } from '@angular/core';
import { XTableViewModule } from '@ng-nest/ui/table-view';

@Component({
  selector: 'ex-default',
  imports: [XTableViewModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = [
    { $index: 1, name: '张三', age: 18, address: '北京' },
    { $index: 2, name: '李四', age: 19, address: '上海' },
    { $index: 3, name: '王五', age: 20, address: '广州' },
    { $index: 4, name: '赵六1', age: 21, address: 'one' },
    { $index: 5, name: '赵六2', age: 21, address: 'one' },
    { $index: 6, name: '赵六3', age: 21, address: 'one' },
    { $index: 7, name: '赵六4', age: 21, address: 'one' },
    { $index: 8, name: '赵六5', age: 21, address: 'one' },
    { $index: 9, name: '赵六6', age: 21, address: 'one' },
    { $index: 10, name: '赵六7', age: 21, address: 'one' },
    { $index: 11, name: '赵六8', age: 21, address: 'one' },
    { $index: 12, name: '赵六9', age: 21, address: 'one' },
    { $index: 13, name: '赵六10', age: 21, address: 'one' },
    { $index: 14, name: '赵六11', age: 21, address: 'one' },
    { $index: 15, name: '赵六12', age: 21, address: 'one' },
    { $index: 16, name: '赵六13', age: 21, address: 'one' },
    { $index: 17, name: '赵六14', age: 21, address: 'one' },
    { $index: 18, name: '赵六15', age: 21, address: 'one' },
    { $index: 19, name: '赵六16', age: 21, address: 'one' },
    { $index: 20, name: '赵六17', age: 21, address: 'one' },
    { $index: 21, name: '赵六18', age: 21, address: 'one' },
    { $index: 22, name: '赵六19', age: 21, address: 'one' }
  ];

  columns = ['$index', 'name', 'age', 'address'];
}
