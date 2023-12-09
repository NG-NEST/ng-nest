import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [CommonModule, XSliderComponent, XIconComponent],
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
