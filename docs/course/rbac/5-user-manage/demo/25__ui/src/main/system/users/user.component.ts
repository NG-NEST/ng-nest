import { Component, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XQuery } from '@ng-nest/ui/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XTableComponent } from '@ng-nest/ui/table';
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
    { id: 'phone', label: '手机号', flex: 1 },
    { id: 'actions', label: '操作', width: 100 }
  ];

  data = (index: number, size: number, query: XQuery) => this.userService.getList({ index, size, ...query });

  index = 1;

  table = viewChild.required<XTableComponent>('table');

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msgBox: XMessageBoxService,
    private message: XMessageService
  ) {}

  ngOnInit(): void {}

  pageTo(url: string) {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

  action(type: string, item?: any) {
    switch (type) {
      case 'info':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'edit':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${item.account}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.userService.delete(item.id).subscribe(() => {
                this.table().change(this.index);
                this.message.success('删除成功！');
              });
          }
        });
        break;
    }
  }
}
