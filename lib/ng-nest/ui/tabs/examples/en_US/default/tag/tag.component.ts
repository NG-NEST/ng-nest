import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tag',
  standalone: true,
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './tag.component.html'
})
export class ExTagComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
}
