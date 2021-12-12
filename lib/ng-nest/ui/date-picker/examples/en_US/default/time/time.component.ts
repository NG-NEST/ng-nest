import { Component } from '@angular/core';

@Component({
  selector: 'ex-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class ExTimeComponent {
  model1 = new Date();
  model2 = new Date();
  model3 = new Date();
}
