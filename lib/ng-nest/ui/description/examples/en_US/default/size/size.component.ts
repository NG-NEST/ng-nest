import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XDescriptionComponent, XDescriptionItemComponent, XRadioComponent],
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
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
}
