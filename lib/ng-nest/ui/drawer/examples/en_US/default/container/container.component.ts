import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPosition } from '@ng-nest/ui/core';
import { XDrawerComponent, XDrawerContainerComponent } from '@ng-nest/ui/drawer';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-container',
  imports: [FormsModule, XDrawerComponent, XDrawerContainerComponent, XRadioComponent, XButtonComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ExContainerComponent {
  value = signal<XPosition>('right');
  data = signal<{ id: XPosition; label: string }[]>([
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'top', label: 'Top' },
    { id: 'bottom', label: 'Bottom' }
  ]);
  visible = signal(false);

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }
}
