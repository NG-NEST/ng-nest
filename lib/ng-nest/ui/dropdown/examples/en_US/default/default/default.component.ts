import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = ['User manage', 'Role manage', 'Organization manage', 'Module manage', 'Log manage'];
}
