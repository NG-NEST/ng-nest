import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tabs',
  standalone: true,
  imports: [CommonModule, XStepsComponent, XTabsComponent, XTabComponent, XButtonComponent, XButtonsComponent],
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

  done() {}
}
