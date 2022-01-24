import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  list = [1, 2, 3, 4, 5];

  ngOnInit() {
    setInterval(() => {
      this.list = [7, 8, 9, 10];
    }, 2000);
  }
}
