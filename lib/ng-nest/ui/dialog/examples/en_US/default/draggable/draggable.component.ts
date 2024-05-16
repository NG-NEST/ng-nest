import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogComponent } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ex-draggable',
  standalone: true,
  imports: [XButtonComponent, XDialogComponent],
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class ExDraggableComponent {
  visible = signal(false);

  dialog() {
    this.visible.set(true);
  }
}
