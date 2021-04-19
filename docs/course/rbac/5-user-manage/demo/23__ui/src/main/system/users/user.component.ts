import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { UserService } from './user.service';

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

  data = (index: number, size: number, query: XQuery) =>
    this.userService.getList({ index, size, ...query });

  constructor(
    private userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  pageTo(url: string) {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }
}
