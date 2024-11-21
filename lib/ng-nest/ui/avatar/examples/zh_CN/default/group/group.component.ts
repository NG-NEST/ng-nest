import { Component, signal } from '@angular/core';
import { XAvatarComponent, XAvatarGroupComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-group',
  imports: [XAvatarComponent, XAvatarGroupComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class ExGroupComponent {
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
}
