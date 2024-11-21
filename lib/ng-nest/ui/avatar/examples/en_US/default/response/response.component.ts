import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-response',
  imports: [XAvatarComponent],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ExResponseComponent {
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
}
