import { Component } from '@angular/core';
import { XTreeFileNode } from '@ng-nest/ui/tree-file';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data: XTreeFileNode[] = [
    { id: 1, label: '针对上一步改变的文件' },
    { id: 2, label: 'my-app' },
    { id: 5, label: 'tsconfig.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/tsconfig.json', pid: 1 },
    { id: 6, label: 'package.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/package.json', pid: 1 },
    { id: 7, label: 'tsconfig.app.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/tsconfig.app.json', pid: 1 },
    { id: 8, label: 'angular.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/angular.json', pid: 1 },
    { id: 9, label: 'src', pid: 2 },
    { id: 10, label: 'app', pid: 9 },
    { id: 11, label: 'assets', pid: 9 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 13, label: 'app.component.html', pid: 10 },
    { id: 14, label: 'app.component.scss', pid: 10 },
    { id: 15, label: 'app.component.ts', pid: 10 }
  ];
}
