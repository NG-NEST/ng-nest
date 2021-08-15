import { Component } from '@angular/core';
import { XSize } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  styles: [
    `
      :host x-description {
        display: block;
        margin-top: 1rem;
      }
    `
  ]
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
}
