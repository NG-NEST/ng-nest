import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = signal(0);
  model2 = signal(60);
}
