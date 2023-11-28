import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPosition } from '@ng-nest/ui/core';
import { XDrawerComponent } from '@ng-nest/ui/drawer';
import { XRadioModule } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XRadioModule, XButtonComponent, XDrawerComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  value: XPosition = 'right';
  data: { id: XPosition; label: string }[] = [
    { id: 'left', label: '左边' },
    { id: 'right', label: '右边' },
    { id: 'top', label: '上边' },
    { id: 'bottom', label: '下边' }
  ];
  visible!: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
