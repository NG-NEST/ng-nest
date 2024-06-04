import { Component, signal } from '@angular/core';

@Component({
  selector: 'ex-line-height',
  standalone: true,
  templateUrl: './line-height.component.html'
})
export class ExLineHeightComponent {
  text = signal(`The more you learn, the more you don't know. <br/>
  The more you learn, the more you don't know. <br/>
  The more you learn, the more you don't know. <br/>`);
}
