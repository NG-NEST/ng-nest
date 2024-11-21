import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-expand',
  imports: [XTableComponent, XButtonComponent, XDescriptionComponent, XDescriptionItemComponent],
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

  dataTpl = [
    { id: 1, name: '最新活动', code: 'activity', icon: 'fto-gift' },
    { id: 2, name: '产品', code: 'product', icon: 'fto-package' },
    { id: 3, name: '解决方案', code: 'solution', icon: 'fto-layers' },
    { id: 4, name: '帮助和支持', code: 'helpSupport', icon: 'fto-phone' },
    { id: 5, pid: 2, name: '云服务器 ECS', code: '1', description: '从安全型到内存型、从进阶型到入门型的云服务器。' },
    { id: 6, pid: 2, name: '轻量应用服务器', code: '2', description: '可快速搭建且易于管理的轻量级云服务器。' },
    { id: 7, pid: 2, name: 'FPGA 云服务器', code: '3', description: 'FPGA实例、低时延可编程硬件加速服务。' },
    { id: 8, pid: 2, name: 'GPU 云服务器', code: '4', description: 'GPU实例、强大的计算性能、弹性按需扩展。' },
    { id: 9, pid: 2, name: '专有宿主机', code: '5', description: '安全合规，构建公共云上的专有资源池' },
    { id: 14, pid: 3, name: 'NAS 文件系统', code: 'nas' },
    { id: 15, pid: 3, name: 'ALB 负载分发', code: 'alb' },
    { id: 16, pid: 3, name: 'OSS 资源', code: 'oss' },
    { id: 17, pid: 3, name: 'Elasticsearch 应用', code: 'elasticsearch' },
    { id: 18, pid: 3, name: 'Flink 应用', code: 'flink' },
    { id: 19, pid: 5, name: '计算', code: 'calculate' },
    { id: 20, pid: 5, name: '网络', code: 'network' },
    { id: 21, pid: 5, name: '存储', code: 'storage' },
    { id: 22, pid: 5, name: '数据库', code: 'database' }
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

  expandIconClick(row: XTableRow) {
    if (row.leaf) {
      row.expanded = !row.expanded;
    }
  }
}
