import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-scroll',
  imports: [XSliderComponent],
  templateUrl: './scroll.component.html'
})
export class ExScrollComponent {
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
