import { Component, signal } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tabs',
  imports: [XStepsComponent, XTabsComponent, XTabComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class ExTabsComponent {
  activated = signal(0);
  data = signal(['步骤 1', '步骤 2', '步骤 3']);

  pre() {
    this.activated.update((x) => --x);
  }

  next() {
    this.activated.update((x) => ++x);
  }

  done() {}
}
