import { Component } from '@angular/core';

@Component({
  selector: 'ex-trigger',
  templateUrl: './trigger.component.html'
})
export class ExTriggerComponent {
  data = ['User manage', 'Role manage', 'Organization manage', 'Module manage', 'Log manage'];
}
