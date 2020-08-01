import { Component } from '@angular/core';

@Component({
  selector: 'ex-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class ExTabsComponent {
  activated = 0;
  data = ['Step 1', 'Step 2', 'Step 3'];

  pre() {
    this.activated -= 1;
  }

  next() {
    this.activated += 1;
  }

  done() {
    console.log('Submit');
  }
}
