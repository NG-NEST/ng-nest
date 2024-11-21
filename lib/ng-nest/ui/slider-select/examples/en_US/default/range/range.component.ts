import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-range',
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class ExRangeComponent {
  model1 = signal([20, 60]);
  model2 = signal<number[]>([]);
}
