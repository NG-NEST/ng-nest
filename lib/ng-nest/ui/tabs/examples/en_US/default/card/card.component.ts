import { Component } from '@angular/core';

@Component({
  selector: 'ex-card',
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
}
