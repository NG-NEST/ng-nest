import { Component, signal } from '@angular/core';
import { XTypographyComponent } from '@ng-nest/ui/typography';

@Component({
  selector: 'ex-default',
  imports: [XTypographyComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  text = signal(`The more you learn, the more you don't know.`);
}
