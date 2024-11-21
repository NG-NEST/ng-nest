import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-label',
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  model = signal(0);
}
