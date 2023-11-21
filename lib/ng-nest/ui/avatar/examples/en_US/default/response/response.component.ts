import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-response',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ExResponseComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
}
