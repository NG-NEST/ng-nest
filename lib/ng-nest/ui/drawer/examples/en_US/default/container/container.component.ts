import { Component } from '@angular/core';
import { XPosition } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ExContainerComponent {
  value: XPosition = 'right';
  data: { id: XPosition; label: string }[] = [
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'top', label: 'Top' },
    { id: 'bottom', label: 'Bottom' }
  ];
  visible!: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}