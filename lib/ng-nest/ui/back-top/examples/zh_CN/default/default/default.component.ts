import { Component } from '@angular/core';
import { XBackTopComponent } from '@ng-nest/ui/back-top';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XBackTopComponent],
  templateUrl: './default.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 50rem;
      }
    `
  ]
})
export class ExDefaultComponent {}
