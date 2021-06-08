import { Component } from '@angular/core';
import { XPosition } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  value: XPosition = 'right';
  data: { id: XPosition; label: string }[] = [
    { id: 'left', label: 'left' },
    { id: 'right', label: 'right' },
    { id: 'top', label: 'top' },
    { id: 'bottom', label: 'bottom' }
  ];
  visible!: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
