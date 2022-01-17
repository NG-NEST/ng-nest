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
      placement: 'left', // Default right
      data: { title: 'Title', content: 'Pass content information, pass content information, pass content information' }
    });
  }
}
