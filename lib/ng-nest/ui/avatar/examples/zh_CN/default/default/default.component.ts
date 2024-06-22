import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
}
