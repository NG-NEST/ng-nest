import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-activated',
  standalone: true,
  imports: [XSliderComponent],
  templateUrl: './activated.component.html'
})
export class ExActivatedComponent {
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
