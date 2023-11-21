import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
  selector: 'ex-fit',
  standalone: true,
  imports: [XAvatarComponent],
  templateUrl: './fit.component.html',
  styleUrls: ['./fit.component.scss']
})
export class ExFitComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
}
