import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data: XData<XSliderNode> = [
    'User Management',
    'Configuration Management',
    'Role Management',
    'Tasks',
    'Work',
    'Messages',
    'Processes',
    'News'
  ];
}
