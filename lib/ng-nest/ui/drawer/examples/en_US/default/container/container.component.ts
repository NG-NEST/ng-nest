import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPosition } from '@ng-nest/ui/core';
import { XDrawerComponent, XDrawerContainerComponent } from '@ng-nest/ui/drawer';
import { XRadioModule } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-container',
  standalone: true,
  imports: [FormsModule, XDrawerComponent, XDrawerContainerComponent, XRadioModule, XButtonComponent],
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