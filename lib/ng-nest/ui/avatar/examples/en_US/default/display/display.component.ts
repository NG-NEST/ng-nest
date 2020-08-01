import { Component } from '@angular/core';

@Component({
  selector: 'ex-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ExDisplayComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
  icon = 'fto-user';
  label = 'Lee';
}
