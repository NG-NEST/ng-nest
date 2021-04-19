import { Component, OnInit } from '@angular/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, type: 'index' },
    { id: 'name', label: '姓名', width: 130 },
    { id: 'account', label: '用户', width: 100 },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '手机号', flex: 1 }
  ];

  data = () =>
    of({
      total: 3,
      list: [
        {
          id: 'abcbefg',
          name: 'administrator',
          account: 'admin',
          email: 'admin@ngnest.com',
          phone: '+8615812345678'
        },
        {
          id: 'hijkmo',
          name: 'guest',
          account: 'guest',
          email: 'guest@ngnest.com',
          phone: '+8615887654321'
        },
        {
          id: 'zcvbnm',
          name: 'operator',
          account: 'operator',
          email: 'operator@ngnest.com',
          phone: '+8615867854634'
        }
      ]
    }).pipe(delay(500));

  constructor() {}

  ngOnInit(): void {}
}
