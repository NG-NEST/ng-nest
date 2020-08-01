import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
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
