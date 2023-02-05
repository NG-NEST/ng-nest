import { Component } from '@angular/core';

@Component({
  selector: 'ex-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class ExRangeComponent {
  model = ['2023-01-01', '2023-02-03'];

  change(event: any) {
    console.log(event);
  }
}
