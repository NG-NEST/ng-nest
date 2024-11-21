import { Component } from '@angular/core';
import { XDrawerService } from '@ng-nest/ui/drawer';
import { ExServiceDrawerComponent } from './service-drawer.component';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-service',
  imports: [XButtonComponent],
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
