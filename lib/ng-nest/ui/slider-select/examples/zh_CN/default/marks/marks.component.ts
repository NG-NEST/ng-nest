import { Component } from '@angular/core';
import { XSliderSelectMark } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class ExMarksComponent {
  model1 = 60;

  model2 = 70;

  model3 = 10;

  model4 = 20;

  marks: XSliderSelectMark[] = [
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
  ];
}
