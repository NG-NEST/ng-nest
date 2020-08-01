import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data: XData<XSliderNode> = [
    { label: 'User Management', icon: 'fto-box' },
    { label: 'Configuration management', icon: 'fto-settings' },
    'Role management',
    'Task',
    'Jobs',
    'News',
    'Process',
    'News'
  ];
}
