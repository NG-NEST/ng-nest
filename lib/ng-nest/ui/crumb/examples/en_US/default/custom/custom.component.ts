import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html'
})
export class ExCustomComponent {
  data = ['Home', 'User Manager', 'User List', 'User Detail'];
}
