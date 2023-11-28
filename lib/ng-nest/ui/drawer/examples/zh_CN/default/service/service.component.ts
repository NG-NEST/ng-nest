import { Component } from '@angular/core';
import { XDrawerService } from '@ng-nest/ui/drawer';
import { ExServiceDrawerComponent } from './service-drawer.component';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-service',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ExServiceComponent {
  constructor(private drawerService: XDrawerService) {}

  create() {
    this.drawerService.create(ExServiceDrawerComponent, {
      placement: 'left', // 默认 right
      data: { title: '标题', content: '传递内容信息，传递内容信息，传递内容信息' }
    });
  }
}
