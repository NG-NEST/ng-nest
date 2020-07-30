import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  visibleTable: boolean;
  visibleForm: boolean;
  visibleCustom: boolean;

  constructor() {}

  customTable() {
    this.visibleTable = true;
  }

  customForm() {
    this.visibleForm = true;
  }

  custom() {
    this.visibleCustom = true;
  }

  customClose() {
    this.visibleCustom = false;
  }
}
