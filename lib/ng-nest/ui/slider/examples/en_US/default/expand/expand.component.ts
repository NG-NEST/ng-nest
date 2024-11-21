import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-expand',
  imports: [XSliderComponent],
  templateUrl: './expand.component.html'
})
export class ExExpandComponent {
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
