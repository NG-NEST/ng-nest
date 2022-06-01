import { Component } from '@angular/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss']
})
export class ExExpandComponent {
  data = [
    { id: 1, name: 'activity', code: 'activity', icon: 'fto-gift' },
    { id: 2, name: 'product', code: 'product', icon: 'fto-package' },
    { id: 3, name: 'solution', code: 'solution', icon: 'fto-layers' },
    { id: 4, name: 'helpSupport', code: 'helpSupport', icon: 'fto-phone' },
    { id: 5, pid: 2, name: 'cloudFoundation', code: 'cloudFoundation' },
    { id: 6, pid: 2, name: 'smartBigData', code: 'smartBigData' },
    { id: 7, pid: 2, name: 'industryApplication', code: 'industryApplication' },
    { id: 8, pid: 2, name: 'blockchain', code: 'blockchain' },
    { id: 9, pid: 2, name: 'proprietaryCloud', code: 'proprietaryCloud' },
    { id: 10, pid: 5, name: 'calculate', code: 'calculate' },
    { id: 11, pid: 5, name: 'network', code: 'network' },
    { id: 12, pid: 5, name: 'storage', code: 'storage' },
    { id: 13, pid: 5, name: 'database', code: 'database' },
    { id: 14, pid: 3, name: 'NAS', code: 'nas' },
    { id: 15, pid: 3, name: 'ALB', code: 'alb' },
    { id: 16, pid: 3, name: 'OSS', code: 'oss' },
    { id: 17, pid: 3, name: 'Elasticsearch', code: 'elasticsearch' },
    { id: 18, pid: 3, name: 'Flink', code: 'flink' }
  ];

  dataTpl = [
    { id: 1, name: 'activity', code: 'activity', icon: 'fto-gift' },
    { id: 2, name: 'product', code: 'product', icon: 'fto-package' },
    { id: 3, name: 'solution', code: 'solution', icon: 'fto-layers' },
    { id: 4, name: 'Help and support', code: 'helpSupport', icon: 'fto-phone' },
    {
      id: 5,
      pid: 2,
      name: 'Cloud Server ECS',
      code: '1',
      description: 'From safe to memory type, from advanced to entry -level cloud server.'
    },
    {
      id: 6,
      pid: 2,
      name: 'Lightweight application server',
      code: '2',
      description: 'The lightweight cloud server that can be quickly built and easy to manage.'
    },
    {
      id: 7,
      pid: 2,
      name: 'FPGA Cloud Server',
      code: '3',
      description: 'FPGA instance, low latency programming hardware acceleration service.'
    },
    {
      id: 8,
      pid: 2,
      name: 'GPU Cloud Server',
      code: '4',
      description: 'GPU instance, powerful computing performance, elasticity expand on demand.'
    },
    {
      id: 9,
      pid: 2,
      name: 'Proprietary host',
      code: '5',
      description: 'Safety compliance, construct a proprietary resource pool on a public cloud'
    },
    { id: 14, pid: 3, name: 'NAS File system', code: 'nas' },
    { id: 15, pid: 3, name: 'ALB Load distribution', code: 'alb' },
    { id: 16, pid: 3, name: 'OSS resource', code: 'oss' },
    { id: 17, pid: 3, name: 'Elasticsearch application', code: 'elasticsearch' },
    { id: 18, pid: 3, name: 'Flink application', code: 'flink' },
    { id: 19, pid: 5, name: 'calculate', code: 'calculate' },
    { id: 20, pid: 5, name: 'network', code: 'network' },
    { id: 21, pid: 5, name: 'storage', code: 'storage' },
    { id: 22, pid: 5, name: 'database', code: 'database' }
  ];

  columns: XTableColumn[] = [
    { id: 'name', label: 'Menu name', type: 'expand', flex: 1.5 },
    { id: 'code', label: 'Menu', flex: 1.5 },
    { id: 'icon', label: 'Icon', flex: 0.5 }
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
