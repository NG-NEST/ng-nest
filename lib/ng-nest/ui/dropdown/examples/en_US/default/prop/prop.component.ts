import { Component } from '@angular/core';

@Component({
  selector: 'ex-prop',
  templateUrl: './prop.component.html'
})
export class ExPropComponent {
  data = [
    { label: 'User manage', icon: 'fto-user' },
    { label: 'Role manage', icon: 'fto-users' },
    'Organization manage',
    { label: 'Module manage', divided: true },
    { label: 'Log manage', disabled: true }
  ];
}
