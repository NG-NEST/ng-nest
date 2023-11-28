import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';
import { XRadioModule } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XDescriptionComponent, XDescriptionItemComponent, XRadioModule],
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
