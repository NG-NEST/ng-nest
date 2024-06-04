import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-multiple',
  standalone: true,
  imports: [XButtonComponent, XDrawerComponent],
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  visible = signal(false);
  visibleOne = signal(false);
  visibleTwo = signal(false);

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  openOne() {
    this.visibleOne.set(true);
  }

  closeOne() {
    this.visibleOne.set(false);
  }

  openTwo() {
    this.visibleTwo.set(true);
  }

  closeTwo() {
    this.visibleTwo.set(false);
  }
}
