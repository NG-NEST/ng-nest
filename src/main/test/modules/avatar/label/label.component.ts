import { Component } from '@angular/core';

@Component({
  selector: 'ex-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  label = 'U';
  index = 0;

  labels = ['U', 'Lee', 'Admin', 'NG-NEST'];

  changeLabel() {
    this.index++;
    this.index = this.index == this.labels.length ? 0 : this.index;
    this.label = this.labels[this.index];
  }
}
