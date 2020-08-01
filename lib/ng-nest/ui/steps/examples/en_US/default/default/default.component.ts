import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  activatedIndex = 0;
  data: string[] = ['Step 1', 'Step 2', 'Step 3'];
  next() {
    this.activatedIndex++;
    if (this.activatedIndex > this.data.length - 1) this.activatedIndex = 0;
  }
}
