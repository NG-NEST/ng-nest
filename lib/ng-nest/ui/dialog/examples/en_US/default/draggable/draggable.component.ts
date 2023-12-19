import { Component } from '@angular/core';
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
  visible!: boolean;
  constructor() {}

  dialog() {
    this.visible = true;
  }
}
