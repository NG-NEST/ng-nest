import { Component } from '@angular/core';

@Component({
  selector: 'ex-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class ExRangeComponent {
  model1 = [20, 60];

  model2!: number;
}
