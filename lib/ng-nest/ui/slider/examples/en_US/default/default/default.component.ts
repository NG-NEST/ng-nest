import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XSliderComponent],
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
