import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-default',
  imports: [XStepsComponent, XButtonComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  activatedIndex = signal(0);
  data = signal(['Step 1', 'Step 2', 'Step 3']);
  next() {
    this.activatedIndex.update((x) => ++x);
    if (this.activatedIndex() > this.data().length - 1) this.activatedIndex.set(0);
  }
}
