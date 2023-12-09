import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-card',
  standalone: true,
  imports: [CommonModule, XTabsComponent, XTabComponent],
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
}
