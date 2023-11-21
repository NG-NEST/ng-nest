import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [XAvatarComponent, XButtonComponent],
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
