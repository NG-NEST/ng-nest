import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom-value',
  templateUrl: './custom-value.component.html',
  styleUrls: ['./custom-value.component.scss']
})
export class ExCustomValueComponent {
  model1 = 60;
  model2: number[] = [20, 50];
}
