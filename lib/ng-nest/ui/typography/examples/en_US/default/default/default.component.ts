import { Component } from '@angular/core';
import { XTypographyComponent } from '@ng-nest/ui/typography';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTypographyComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  text = `The more you learn, the more you don't know.`;
}
