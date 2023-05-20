import { Component } from '@angular/core';
// import { interval } from 'rxjs';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  list = [1, 2, 3, 4, 5];

  ngOnInit() {
    // interval(2000).subscribe(() => {
    //   this.list = [7, 8, 9, 10];
    // });
  }
}
