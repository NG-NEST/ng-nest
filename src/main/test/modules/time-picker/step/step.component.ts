import { Component } from '@angular/core';

@Component({
  selector: 'ex-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class ExStepComponent {
  model: any;

  change(date: any) {
    console.log(date);
  }
}
