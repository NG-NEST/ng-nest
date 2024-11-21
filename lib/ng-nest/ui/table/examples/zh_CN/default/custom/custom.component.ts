import { Component } from '@angular/core';
import { CustomService } from './custom.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-custom',
  imports: [XTableComponent, XAvatarComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  providers: [CustomService]
})
export class ExCustomComponent {
  size = 100;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
  columns: XTableColumn[] = [{ id: 'name', label: '用户', flex: 1, sort: true }];

  constructor(private service: CustomService) {}

  ngOnInit() {}
}
