import { Component, signal } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XSliderComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data = signal([
    { label: 'User Management', icon: 'fto-box' },
    { label: 'Configuration management', icon: 'fto-settings' },
    'Role management',
    'Task',
    'Jobs',
    'News',
    'Process',
    'News'
  ]);
}
