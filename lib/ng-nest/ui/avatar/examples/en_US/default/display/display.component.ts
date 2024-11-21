import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-display',
  imports: [XAvatarComponent],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ExDisplayComponent {
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
  icon = signal('fto-user');
  label = signal('Lee');
}
