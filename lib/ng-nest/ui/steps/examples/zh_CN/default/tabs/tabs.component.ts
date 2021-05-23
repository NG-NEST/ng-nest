import { Component } from '@angular/core';

@Component({
  selector: 'ex-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class ExTabsComponent {
  activated = 0;
  data = ['步骤 1', '步骤 2', '步骤 3'];

  pre() {
    this.activated -= 1;
  }

  next() {
    this.activated += 1;
  }

  done() {}
}
