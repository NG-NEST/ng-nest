import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer/drawer.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XInputModule,
    XRadioModule,
    XDrawerComponent,
    XIconComponent
  ],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  visible!: boolean;
  visibleTable!: boolean;
  visibleForm!: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  openTable() {
    this.visibleTable = true;
  }

  closeTable() {
    this.visibleTable = false;
  }

  openForm() {
    this.visibleForm = true;
  }

  closeForm() {
    this.visibleForm = false;
  }
}
