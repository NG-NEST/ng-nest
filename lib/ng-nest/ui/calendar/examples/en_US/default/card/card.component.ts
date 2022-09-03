import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class ExCardComponent {
  constructor() {}

  rangeChange(event: any) {
    console.log(event);
  }

  onDateChange(event: any) {
    console.log(event);
  }
}
