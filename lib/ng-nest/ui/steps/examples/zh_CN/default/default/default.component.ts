import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [CommonModule, XStepsComponent, XButtonComponent],
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
