import { Component, signal } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-label',
  imports: [XAvatarComponent, XButtonComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  label = signal('U');
  index = signal(0);
  labels = signal(['U', 'Lee', 'Admin', 'NG-NEST']);

  changeLabel() {
    this.index.update((x) => {
      ++x;
      return x === this.labels().length ? 0 : x;
    });
    this.label.set(this.labels()[this.index()]);
  }
}
