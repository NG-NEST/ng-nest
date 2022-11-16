import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { XTableCellConfig, XTableColumn } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-config-two',
  templateUrl: './config-two.component.html',
  providers: [ConfigService]
})
export class ExConfigTwoComponent {
  data = Array.from({ length: 10 }).map((_x, i) => {
    i++;
    return {
      id: i,
      name: '姓名' + i,
      position: '职位' + i,
      email: '邮箱' + i,
      phone: '手机' + i,
      organization: '组织' + i
    };
  });

  columns: XTableColumn[] = [
    { id: 'index', label: '序号2', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '单位2', flex: 1.5, sort: true },
    { id: 'position', label: '公司项目内部模拟利润2', flex: 1, sort: true },
    { id: 'email', label: '政府补助2', flex: 1 },
    { id: 'phone', label: '营业额外收入2', flex: 1 },
    { id: 'organization', label: '项目成本2', flex: 1, sort: true },
    { id: 'rengong', label: '人工成本2', flex: 1, sort: true },
    { id: 'actions', label: '操作2', flex: 1, right: 0 }
  ];

  cellConfig: XTableCellConfig = {
    thead: {
      cells: [
        { gridArea: '1 / 1 / 3 / 2', id: 'index' },
        { gridArea: '1 / 2 / 3 / 3', id: 'name' },
        { gridArea: '1 / 3 / 2 / 6', label: '内膜收入' },
        { gridArea: '2 / 3 / 3 / 3', id: 'position' },
        { gridArea: '2 / 4 / 3 / 4', id: 'email' },
        { gridArea: '2 / 5 / 3 / 5', id: 'phone' },
        { gridArea: '1 / 6 / 2 / 8', label: '内膜成本' },
        { gridArea: '2 / 6 / 3 / 6', id: 'organization' },
        { gridArea: '2 / 7 / 3 / 7', id: 'rengong' },
        { gridArea: '1 / 8 / 3 / 8', id: 'actions' }
      ]
    },
    tbody: {
      cells: [
        { gridArea: '1 / 1', id: 'index' },
        { gridArea: '1 / 2', id: 'name' },
        { gridArea: '1 / 3', id: 'position' },
        { gridArea: '1 / 4', id: 'email' },
        { gridArea: '1 / 5', id: 'phone' },
        { gridArea: '1 / 6', id: 'organization' },
        { gridArea: '1 / 7', id: 'rengong' },
        { gridArea: '1 / 8', id: 'actions' }
      ]
    }
  };

  constructor(public service: ConfigService) {}

  ngOnInit() {
    
  }
}
