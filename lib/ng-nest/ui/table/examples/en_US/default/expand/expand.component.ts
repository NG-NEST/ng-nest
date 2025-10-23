import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-expand',
  imports: [XTableComponent, XButtonComponent],
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
}
