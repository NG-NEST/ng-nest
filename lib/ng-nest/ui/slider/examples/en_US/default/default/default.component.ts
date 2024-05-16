import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XSliderComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
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
