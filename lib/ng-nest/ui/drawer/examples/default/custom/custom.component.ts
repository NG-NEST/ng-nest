import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  visible: boolean;
  visibleTable: boolean;
  visibleForm: boolean;

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
