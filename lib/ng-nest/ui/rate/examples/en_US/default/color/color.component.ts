import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-color',
  standalone: true,
  imports: [FormsModule, XRateComponent, XIconComponent],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ExColorComponent {
  model1 = 1;
  model2 = 2;
  model3 = 3;
  model4 = 4;
  model5 = 1;
  colorOne = '#1976d2';
  colorTwo = {
    '#1976d2': (value: number) => value === 1,
    '#67c23a': (value: number) => value === 2,
    '#e6a23c': (value: number) => value === 3,
    '#f56c6c': (value: number) => value > 3
  };
  colorThree = {
    '#d1e4f6': (value: number) => value === 0.5,
    '#a3c8ed': (value: number) => value === 1,
    '#75ade4': (value: number) => value === 1.5,
    '#4791db': (value: number) => value === 2,
    '#2b7fd1': (value: number) => value === 2.5,
    '#e6a23c': (value: number) => value === 3,
    '#f56c6c': (value: number) => value > 3
  };
}
