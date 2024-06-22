import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XBadgeComponent } from '@ng-nest/ui/badge';

@Component({
  selector: 'ex-badge',
  standalone: true,
  imports: [XBadgeComponent, XAvatarComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class ExBadgeComponent {
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
}
