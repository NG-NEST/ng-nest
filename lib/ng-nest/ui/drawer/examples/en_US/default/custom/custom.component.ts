import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer/drawer.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XInputComponent } from '@ng-nest/ui/input';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-custom',
  imports: [
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XInputComponent,
    XRadioComponent,
    XDrawerComponent,
    XIconComponent
  ],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  visible = signal(false);
  visibleTable = signal(false);
  visibleForm = signal(false);

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  openTable() {
    this.visibleTable.set(true);
  }

  closeTable() {
    this.visibleTable.set(false);
  }

  openForm() {
    this.visibleForm.set(true);
  }

  closeForm() {
    this.visibleForm.set(false);
  }
}
