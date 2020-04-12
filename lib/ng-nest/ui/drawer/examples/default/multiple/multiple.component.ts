import { Component } from '@angular/core';

@Component({
  selector: 'ex-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  visible: boolean;
  visibleOne: boolean;
  visibleTwo: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  openOne() {
    this.visibleOne = true;
  }

  closeOne() {
    this.visibleOne = false;
  }

  openTwo() {
    this.visibleTwo = true;
  }

  closeTwo() {
    this.visibleTwo = false;
  }
}
