import { Component, signal } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tabs',
  standalone: true,
  imports: [XStepsComponent, XTabsComponent, XTabComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class ExTabsComponent {
  activated = signal(0);
  data = signal(['Step 1', 'Step 2', 'Step 3']);

  pre() {
    this.activated.update((x) => --x);
  }

  next() {
    this.activated.update((x) => ++x);
  }

  done() {}
}
