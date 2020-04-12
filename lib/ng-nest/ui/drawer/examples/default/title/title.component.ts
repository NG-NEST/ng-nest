import { Component } from '@angular/core';

@Component({
  selector: 'ex-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class ExTitleComponent {
  visible: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
