import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  activatedIndex = 0;
  data: string[] = ['步骤 1', '步骤 2', '步骤 3'];
  next() {
    this.activatedIndex++;
    if (this.activatedIndex > this.data.length - 1) this.activatedIndex = 0;
  }
}
