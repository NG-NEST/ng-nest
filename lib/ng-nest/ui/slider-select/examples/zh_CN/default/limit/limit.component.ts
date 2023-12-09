import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-limit',
  standalone: true,
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class ExLimitComponent {
  model1 = 0;
  model2 = 0;
  model3 = 0;
}
