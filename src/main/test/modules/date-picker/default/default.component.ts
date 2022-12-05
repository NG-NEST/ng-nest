import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1: any;
  model2 = new Date();

  change($event: any, model: any) {
    console.log($event, model);
  }
}
