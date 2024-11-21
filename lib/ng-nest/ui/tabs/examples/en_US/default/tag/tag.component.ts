import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tag',
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './tag.component.html'
})
export class ExTagComponent {
  labels = signal(['User Management', 'Configuration Management', 'Role Management', 'Tasks']);
}
