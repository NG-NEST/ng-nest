import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-expand',
  imports: [XTableComponent, XButtonComponent],
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss']
})
export class ExExpandComponent {
  data = [
    { id: 1, name: '最新活动', code: 'activity', icon: 'fto-gift' },
    { id: 2, name: '产品', code: 'product', icon: 'fto-package' },
    { id: 3, name: '解决方案', code: 'solution', icon: 'fto-layers' },
    { id: 4, name: '帮助和支持', code: 'helpSupport', icon: 'fto-phone' },
    { id: 5, pid: 2, name: '云基础', code: 'cloudFoundation' },
    { id: 6, pid: 2, name: '智能大数据', code: 'smartBigData' },
    { id: 7, pid: 2, name: '行业应用', code: 'industryApplication' },
    { id: 8, pid: 2, name: '区块链', code: 'blockchain' },
    { id: 9, pid: 2, name: '专有云', code: 'proprietaryCloud' },
    { id: 10, pid: 5, name: '计算', code: 'calculate' },
    { id: 11, pid: 5, name: '网络', code: 'network' },
    { id: 12, pid: 5, name: '存储', code: 'storage' },
    { id: 13, pid: 5, name: '数据库', code: 'database' },
    { id: 14, pid: 3, name: 'NAS 文件系统', code: 'nas' },
    { id: 15, pid: 3, name: 'ALB 负载分发', code: 'alb' },
    { id: 16, pid: 3, name: 'OSS 资源', code: 'oss' },
    { id: 17, pid: 3, name: 'Elasticsearch 应用', code: 'elasticsearch' },
    { id: 18, pid: 3, name: 'Flink 应用', code: 'flink' }
  ];

  columns: XTableColumn[] = [
    { id: 'name', label: '菜单名称', type: 'expand', flex: 1.5 },
    { id: 'code', label: '菜单编码', flex: 1.5 },
    { id: 'icon', label: '图标', flex: 0.5 }
  ];

  expanded = [2];
  expandedAll = false;
  expandedLevel = 0;

  constructor() {}

  ngOnInit() {}

  onRowClick(row: XTableRow) {
    console.log('行点击事件', row);
  }
}
