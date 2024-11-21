import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-title',
  imports: [XButtonComponent, XDrawerComponent],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class ExTitleComponent {
  visible = signal(false);

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }
}
