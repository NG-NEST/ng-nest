import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [CommonModule, XTabsComponent, XTabComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
}
