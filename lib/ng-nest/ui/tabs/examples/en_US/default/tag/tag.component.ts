import { Component } from '@angular/core';

@Component({
  selector: 'ex-tag',
  templateUrl: './tag.component.html'
})
export class ExTagComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
}
