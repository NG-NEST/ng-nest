import { Component } from '@angular/core';
import { XAvatarComponent, XAvatarGroupComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-group',
  standalone: true,
  imports: [XAvatarComponent, XAvatarGroupComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class ExGroupComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
}
