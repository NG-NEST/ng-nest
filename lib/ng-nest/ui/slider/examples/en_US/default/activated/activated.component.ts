import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-activated',
  imports: [XSliderComponent],
  templateUrl: './activated.component.html'
})
export class ExActivatedComponent {
  data = signal([
    'User Management',
    'Configuration Management',
    'Role Management',
    'Tasks',
    'Work',
    'Messages',
    'Processes',
    'News'
  ]);
}
