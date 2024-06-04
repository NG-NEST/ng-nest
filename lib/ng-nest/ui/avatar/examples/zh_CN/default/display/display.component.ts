import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-display',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ExDisplayComponent {
  src = signal('https://ngnest.com/assets/img/logo/logo-144x144.png');
  icon = signal('fto-user');
  label = signal('王');
}
