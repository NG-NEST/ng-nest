import { Component } from '@angular/core';

@Component({
  selector: 'ex-draggable',
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
