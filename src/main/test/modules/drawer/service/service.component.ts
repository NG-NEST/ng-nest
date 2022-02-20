import { Component } from '@angular/core';
import { XDrawerService } from '@ng-nest/ui/drawer';
import { ExServiceDrawerComponent } from './service-drawer.component';

@Component({
  selector: 'ex-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ExServiceComponent {
  constructor(private drawerService: XDrawerService) {}

  create() {
    this.drawerService.create(ExServiceDrawerComponent, {
      placement: 'left', // 默认right
      data: { title: '标题', content: '传递内容信息，传递内容信息，传递内容信息' }
    });
  }
}
