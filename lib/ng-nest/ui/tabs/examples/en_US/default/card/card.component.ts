import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-card',
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = signal(['User Management', 'Configuration Management', 'Role Management', 'Tasks']);
}
