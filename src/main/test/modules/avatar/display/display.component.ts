import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-display',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ExDisplayComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
  icon = 'fto-user';
  label = '王';
}
