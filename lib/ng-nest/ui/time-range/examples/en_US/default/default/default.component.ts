import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  diff = 1000 * 60 * 60 * 24 * 2 - 1000 * 30;
}
