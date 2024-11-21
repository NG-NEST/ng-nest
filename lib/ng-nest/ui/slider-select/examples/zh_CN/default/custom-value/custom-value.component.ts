import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-custom-value',
  imports: [FormsModule, XSliderSelectComponent, XIconComponent],
  templateUrl: './custom-value.component.html',
  styleUrls: ['./custom-value.component.scss']
})
export class ExCustomValueComponent {
  model1 = signal(60);
  model2 = signal<number[]>([20, 50]);
}
