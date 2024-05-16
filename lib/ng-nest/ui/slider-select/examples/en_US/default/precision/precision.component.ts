import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-precision',
  standalone: true,
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './precision.component.html',
  styleUrls: ['./precision.component.scss']
})
export class ExPrecisionComponent {
  model1 = signal(0);
  model2 = signal(0);
}
