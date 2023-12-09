import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPosition } from '@ng-nest/ui/core';
import { XDrawerComponent } from '@ng-nest/ui/drawer';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XRadioComponent, XButtonComponent, XDrawerComponent],
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
