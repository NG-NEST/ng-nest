import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-default',
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  labels = signal(['User Management', 'Configuration Management', 'Role Management', 'Tasks']);
}
