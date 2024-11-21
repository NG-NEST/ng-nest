import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-limit',
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class ExLimitComponent {
  model1 = signal(0);
  model2 = signal(0);
  model3 = signal(0);
}
