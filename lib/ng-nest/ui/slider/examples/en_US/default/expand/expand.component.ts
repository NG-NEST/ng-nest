import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-expand',
  standalone: true,
  imports: [XSliderComponent],
  templateUrl: './expand.component.html'
})
export class ExExpandComponent {
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
