import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
}
