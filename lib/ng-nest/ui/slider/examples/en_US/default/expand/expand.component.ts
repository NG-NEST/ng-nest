import { Component } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-expand',
  standalone: true,
  imports: [XSliderComponent],
  templateUrl: './expand.component.html'
})
export class ExExpandComponent {
  data = [
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
