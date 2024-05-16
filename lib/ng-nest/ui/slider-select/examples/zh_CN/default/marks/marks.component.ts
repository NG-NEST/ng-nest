import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent, XSliderSelectMark } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-marks',
  standalone: true,
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class ExMarksComponent {
  model1 = signal(60);
  model2 = signal(70);
  model3 = signal(10);
  model4 = signal(20);

  marks = signal<XSliderSelectMark[]>([
    {
      value: 0,
      label: '0°C'
    },
    {
      value: 37,
      label: '37°C'
    },
    {
      value: 60,
      label: '60°C'
    },
    {
      value: 100,
      label: '100°C',
      style: {
        color: '#f56c6c'
      }
    }
  ]);
}
